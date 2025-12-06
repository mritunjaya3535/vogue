import Footer from "@/components/Footer";
import Header from "@/components/Header";
import VogueLandingPage from "@/components/VogueLandingPage";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <VogueLandingPage />
      <Footer />
    </div>
  );
}
