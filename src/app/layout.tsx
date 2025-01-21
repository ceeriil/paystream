import "@/styles/globals.css";

import { Urbanist } from "next/font/google";

import MainFooter from "@/components/Footer";
import { QueryProvider } from "@/providers/query";
import type { ChildrenProps } from "@/types";
import ContextProvider from "@/context";

export const metadata = {
  title: "Paystream",
  description:
    "A highly opinionated and complete starter for Next.js projects ready to production. Includes Typescript, Styled Components, Prettier, ESLint, Husky, SEO, and more.",
};
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${urbanist.className} h-full flex flex-col justify-between bg-[#000] text-foreground`}
      >
        <section className="w-full">
          <QueryProvider>
            <ContextProvider>{children}</ContextProvider>
          </QueryProvider>
        </section>
        {/*         <MainFooter />
         */}{" "}
      </body>
    </html>
  );
}
