export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#091219] border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border border-[#C9A84C]/40 flex items-center justify-center">
            <span className="text-[#C9A84C] text-[9px] font-display">M</span>
          </span>
          <span className="text-white/25 text-xs tracking-widest uppercase font-light">
            Merlin Leadership
          </span>
        </div>
        <p className="text-white/20 text-xs tracking-wide font-light">
          © {year} Merlin Leadership. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
