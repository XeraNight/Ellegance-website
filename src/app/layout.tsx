import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script, Nunito, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ellegance | Tanečný klub Košice",
  description: "Miesto, kde začína váš tanečný život. Tanečný klub, spoločenské tance, eventy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} ${nunito.variable} ${caveat.variable} font-sans antialiased bg-obsidian-900 text-gray-300 min-h-screen flex flex-col selection:bg-gold-500 selection:text-obsidian-900`}>
        
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
