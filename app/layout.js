import '@/app/globals.css'
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-20">{children}</main> {/* pushes content below header */}
        <Footer />
      </body>
    </html>
  )
}