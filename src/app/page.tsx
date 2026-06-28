import { Footer } from "@/components/layout/Footer";
import { HumanizerCard } from "@/components/humanizer/HumanizerCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-primary selection:text-black">
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col justify-center">
        <header className="mb-8 border-b-4 border-black pb-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">HumanizeAI</h1>
          <p className="text-xl font-bold mt-2">Bypass the machine. Write like a human.</p>
        </header>

        <section id="humanizer" className="relative">
          <HumanizerCard />
        </section>
      </div>

      <Footer />
    </main>
  );
}
