import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/cart";

export default function FrontLayout(props: LayoutProps<"/">) {
    return (
        <CartProvider>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{props.children}</main>
                <Footer />
            </div>
        </CartProvider>
    );
}
