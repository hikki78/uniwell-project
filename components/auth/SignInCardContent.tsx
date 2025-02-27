"use client";

import { useForm } from "react-hook-form";
import { CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProviderSignInBtns } from "./ProviderSignInBtns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signInSchema, SignInSchema } from "@/schema/signInSchema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingState } from "../ui/loadingState";

export const SignInCardContent = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);

    try {
      const account = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!account) throw new Error("Something went wrong");

      if (account.error) {
        toast({
          title: (account.error),
          variant: "destructive",
        });
      } else {
        toast({
          title: ("SUCCESS.SIGN_IN"),
        });
        router.push("/onboarding");
        router.refresh();
      }
    } catch (err) {
      let errMsg = ("ERRORS.DEFAULT");
      if (typeof err === "string") {
        errMsg = err;
      } else if (err instanceof Error) {
        errMsg = (err.message);
      }
      toast({
        title: errMsg,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <ProviderSignInBtns signInCard onLoading={setIsLoading} />
          <div className="space-y-1.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={("EMAIL")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={("PASSWORD")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Button
              disabled={isLoading}
              className="w-full font-bold text-white"
              type="submit"
            >
              {isLoading ? (
                <LoadingState loadingText={("PENDING.LOADING")} />
              ) : (
                t("SIGN_IN.SUBMIT_BTN")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};