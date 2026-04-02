import CheckoutPage from "@/app/pages/CheckoutPage";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Checkout() {
  return (
    <div className="bg-[#040b1f] text-white min-h-screen">
      <Navbar />
      <CheckoutPage />
      <Footer />
    </div>
  );
}
