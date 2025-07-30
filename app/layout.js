"use client";
import "@/app/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ParticleBackground from "../components/ParticleBackground";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${zenKaku.className} overflow-x-hidden`}>
        <ParticleBackground />
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <main className="pt-14 md:pt-20 px-4 md:px-0" key={pathname}>
            {children}
          </main>
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  );
}
