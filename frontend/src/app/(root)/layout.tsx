import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main className="w-full">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
        </main>
    );
}
