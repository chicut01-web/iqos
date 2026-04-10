import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import IQOSDevice from "@/components/IQOSDevice";
import Features from "@/components/Features";
import Shop from "@/components/Shop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <AgeGate />
      <Navbar />
      <IQOSDevice />
      <Features />
      <Shop />
      <Footer />
    </main>
  );
}
