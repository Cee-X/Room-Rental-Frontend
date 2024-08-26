import type { Metadata } from "next";
import { inter } from "./ui/font"
import "./globals.css";
import NavBar from "./ui/navbar";
import { AuthProvider } from "./auth/AuthProvider";


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
        </AuthProvider>
        
      </body>
    </html>
  );
}
