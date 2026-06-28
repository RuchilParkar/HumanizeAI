"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-30" />
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Advanced AI rewriting engine</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 text-glow"
        >
          Write Like a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Human.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          Transform AI-generated writing into natural, engaging, and readable content using intelligent AI rewriting.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <Button size="lg" className="rounded-full h-14 px-8 text-base bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Humanize Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-md text-white">
            View Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
