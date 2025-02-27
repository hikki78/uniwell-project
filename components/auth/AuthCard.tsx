import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { SignUpCardContent } from "./SignUpCardContent";
import { SignInCardContent } from "./SignInCardContent";

interface Props {
  signInCard?: boolean;
}

export const AuthCard = ({ signInCard }: Props) => {
  return (
    <>
      <Card className="w-full sm:min-w-[28rem] sm:w-auto">
        <CardHeader>
          <Image
            alt=""
            className="rounded-full object-cover self-center"
            width={50}
            height={50}
            src={"https://github.com/shadcn.png"}
          />
          <CardTitle className="pt-2">
            {signInCard ? ("SIGN_IN.TITLE") : ("SIGN_UP.TITLE")}
          </CardTitle>
          <CardDescription>
            {signInCard ? ("SIGN_IN.DESC") : ("SIGN_UP.DESC")}
          </CardDescription>
        </CardHeader>
        {signInCard ? <SignInCardContent /> : <SignUpCardContent />}
      </Card>
      <p className="text-sm">
        {signInCard
          ? ("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")
          : ("SIGN_UP.HAVE_ACCOUNT.FIRST")}{" "}
        <Link
          className="text-primary"
          href={signInCard ? "/sign-up" : "/sign-in"}
        >
          {signInCard
            ? ("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")
            : ("SIGN_UP.HAVE_ACCOUNT.SECOND")}{" "}
        </Link>
      </p>
    </>
  );
};