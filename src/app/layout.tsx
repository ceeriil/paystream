import "@/styles/globals.css";

import { Urbanist } from "next/font/google";
import type { ChildrenProps } from "@/types";
import { Toaster } from "@/components/ui/toaster";
require("@solana/wallet-adapter-react-ui/styles.css");

export const metadata = {
  title: "Paystream",
  description:
    "A highly opinionated and complete starter for Next.js projects ready to production. Includes Typescript, Styled Components, Prettier, ESLint, Husky, SEO, and more.",
  icons: {
    icon: "/logo.png",
  },
};
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${urbanist.className} h-full flex flex-col justify-between bg-[#000] text-foreground`}
        suppressHydrationWarning
      >
        <section className="w-full"></section>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
