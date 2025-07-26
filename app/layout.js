'use client'
import '@/app/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from '@/components/Background';
import { Zen_Kaku_Gothic_New } from 'next/font/google'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  const pathname = usePathname()
  
  return (
    <html lang="en">
      <body className={zenKaku.className}>
        <Background />
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <main className="pt-20" key={pathname}>
            {children}
          </main>
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  )
}