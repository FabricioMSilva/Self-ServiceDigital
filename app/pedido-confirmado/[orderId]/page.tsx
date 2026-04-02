import OrderConfirmedPage from "@/app/pages/OrderConfirmedPage";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function PedidoConfirmado({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="bg-[#040b1f] text-white min-h-screen">
      <Navbar />
      <OrderConfirmedPage params={params} />
      <Footer />
    </div>
  );
}
