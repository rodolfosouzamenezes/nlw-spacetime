import type { Metadata } from "next";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";
import "./globals.css";
import { Copyrigth } from "@/components/Copyrigth";
import { Hero } from "@/components/Hero";
import { Profile } from "@/components/Profile";
import { SigninLink } from "@/components/SigninLink";
import { cookies } from "next/headers";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata: Metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo contruída com React, Next.js TailwindCSS e Typescript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} font-sans text-gray-100 bg-gray-900`}
      >
        <main className="grid grid-cols-2 min-h-screen">
          <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden bg-[url(../assets/bg-stars.svg)] bg-cover border-r border-white/10">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SigninLink />}

            <Hero />

            <Copyrigth />
          </div>

          <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
