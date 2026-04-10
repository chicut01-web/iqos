import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IQOS | Premium Tobacco Heating Technology",
  description: "Tecnologia HeatControl™. Tabacco vero. Zero combustione. Sperimenta il futuro del fumo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#0A0A0A] text-white`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
