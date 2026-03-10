import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueProp />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
