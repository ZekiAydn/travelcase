import { ReactNode } from "react";
import TopHeader from "@/components/TopHeader";
import Header from "@/components/Header";


interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <TopHeader />
            <Header />
            <main>{children}</main>
        </div>
    );
}
