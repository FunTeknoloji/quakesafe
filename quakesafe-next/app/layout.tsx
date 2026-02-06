import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "QuakeSafe Next",
    description: "Next Gen Earthquake Safety",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" className="dark">
            <body className={inter.className}>
                <SettingsProvider>
                    <div className="min-h-screen flex flex-col pb-24">
                        {children}
                        <BottomNav />
                    </div>
                </SettingsProvider>
            </body>
        </html>
    );
}
