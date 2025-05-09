import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Cley and Sara",
  description: "Games to get to know each other",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

