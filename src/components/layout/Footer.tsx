export function Footer() {
  return (
    <footer className="mt-16 py-8 border-t-8 border-black bg-primary text-primary-foreground font-mono">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4 font-black uppercase text-2xl tracking-tighter">
          <div>HumanizeAI</div>
          <div className="flex gap-6 text-base">

            <a href="https://ruchil-parkar.vercel.app/" className="hover:underline decoration-4">Portfolio</a>

          </div>
        </div>
        <p className="text-sm font-bold border-t-4 border-black pt-4">
          CRAFTED WITH MODERN AI INFRASTRUCTURE FOR FAST, RELIABLE, AND SECURE WRITING.
        </p>
      </div>
    </footer>
  );
}
