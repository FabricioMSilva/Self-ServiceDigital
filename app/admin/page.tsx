import AdminPanel from "@/app/pages/AdminPanel";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Admin() {
  return (
    <div className="bg-[#040b1f] text-white min-h-screen">
      <Navbar />
      <AdminPanel />
      <Footer />
    </div>
  );
}
