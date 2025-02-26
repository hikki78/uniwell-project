import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { notFound } from "next/navigation";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
//import { QueryProvider } from "@/providers/QueryProvider";

const locales = ["en", "te"];

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  //@ts-ignore
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
          <AuthProvider>
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                {children}
              </ThemeProvider>
            </QueryProvider>
          </AuthProvider>
      </body>
    </html>
  );
}