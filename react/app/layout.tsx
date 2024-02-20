import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Chit Chat",
  description: "Chit Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="justify-center h-full flex">{children}</body>
    </html>
  );
}
