import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FrontLayout(props: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
}
