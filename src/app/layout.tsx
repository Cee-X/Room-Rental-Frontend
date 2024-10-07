import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { inter } from "@/components/ui/font";
import NavBar from "@/components/ui/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roomify",
  description: "Roomify - Rent rooms easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            <NavBar/>
            {children}
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
