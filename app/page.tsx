import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85"
        alt="Mountain peak"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#0D1B2A]/80" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 60% 40%, #C9A84C 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-6">
        {/* Logo mark */}
        <div className="border border-[#C9A84C]/60 w-12 h-12 flex items-center justify-center mb-10">
          <span className="text-[#C9A84C] font-display text-lg font-medium">M</span>
        </div>

        <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light mb-6">
          Merlin Leadership
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] mb-6">
          Something is <span className="italic text-[#C9A84C]">coming.</span>
        </h1>

        <p className="text-white/40 text-sm tracking-widest uppercase font-light">
          Strategic Advisory — Launching Soon
        </p>
      </div>
    </main>
  );
}
