import CartPage from "@/app/pages/CartPage";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function CarrinhoPage() {
  return (
    <div className="bg-[#040b1f] text-white min-h-screen">
      <Navbar />
      <CartPage />
      <Footer />
    </div>
  );
}
