export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#0D1B2A] px-6 py-16 flex justify-center">
      <div className="max-w-xl w-full">
        <div className="border border-[#C9A84C]/60 w-10 h-10 flex items-center justify-center mb-10">
          <span className="text-[#C9A84C] font-display text-base font-medium">M</span>
        </div>

        <p className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-light mb-8">
          Merlin Leadership
        </p>

        <h1 className="text-white text-2xl font-medium mb-10">Privacy Policy</h1>

        <div className="space-y-8 text-white/50 text-sm leading-relaxed">
          <section>
            <h2 className="text-white/80 text-xs tracking-widest uppercase mb-3">Information We Collect</h2>
            <p>When you submit your email address through our website, we collect and store that email address for the purpose of notifying you when Merlin Leadership launches.</p>
          </section>

          <section>
            <h2 className="text-white/80 text-xs tracking-widest uppercase mb-3">How We Use Your Information</h2>
            <p>Your email address is used solely to send you updates about the launch of Merlin Leadership. We will not sell, share, or distribute your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-white/80 text-xs tracking-widest uppercase mb-3">Your Rights</h2>
            <p>You may request removal from our list at any time by emailing <a href="mailto:begin@merlinleadership.com" className="text-[#C9A84C] hover:underline">begin@merlinleadership.com</a>. We will remove your information promptly.</p>
          </section>

          <section>
            <h2 className="text-white/80 text-xs tracking-widest uppercase mb-3">Data Storage</h2>
            <p>Email submissions are processed through Formspree. Their privacy policy is available at formspree.io.</p>
          </section>

          <section>
            <h2 className="text-white/80 text-xs tracking-widest uppercase mb-3">Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:begin@merlinleadership.com" className="text-[#C9A84C] hover:underline">begin@merlinleadership.com</a>.</p>
          </section>

          <p className="text-white/20 text-xs pt-4">Last updated: April 2026</p>
        </div>

        <div className="mt-12">
          <a href="/" className="text-[#C9A84C]/60 text-xs tracking-widest uppercase hover:text-[#C9A84C] transition-colors">
            ← Back
          </a>
        </div>
      </div>
    </main>
  );
}
