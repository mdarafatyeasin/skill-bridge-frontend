import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/Navbar";

export default function commonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer/>
        </div>
    );
}