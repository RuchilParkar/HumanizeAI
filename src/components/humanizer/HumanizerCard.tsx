"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ProviderResponse } from "@/lib/ai/types";

export function HumanizerCard() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("Natural");
  const [intensity, setIntensity] = useState("Balanced");
  const [grammarFix, setGrammarFix] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("PLEASE ENTER TEXT TO HUMANIZE.");
      return;
    }
    
    setIsGenerating(true);
    setOutput("");
    
    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input,
          tone,
          intensity,
          grammarFix,
        }),
      });
      
      const data: ProviderResponse = await res.json();
      
      if (res.ok && data.success && data.text) {
        setOutput(data.text);
        toast.success(`SUCCESS! TEXT HUMANIZED.`);
      } else {
        toast.error(data.message || "FAILED TO GENERATE.");
      }
    } catch (error) {
      toast.error("NETWORK ERROR.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("COPIED TO CLIPBOARD!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    toast.info("CLEARED TEXT.");
  };

  return (
    <div className="w-full relative z-10">
      <div className="brutalist-card flex flex-col lg:flex-row gap-8">
        
        {/* Controls Sidebar */}
        <div className="w-full lg:w-72 flex flex-col gap-8 shrink-0">
          <div>
            <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black dark:border-white pb-2">Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="font-bold text-lg uppercase">Tone</Label>
                <div className="flex flex-wrap gap-2">
                  {["Natural", "Professional", "Casual", "Academic"].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-1 font-bold text-sm uppercase border-2 transition-all ${tone === t ? 'bg-primary text-primary-foreground border-black dark:border-white shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]' : 'bg-transparent border-black dark:border-white hover:bg-black/10 dark:hover:bg-white/10'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-bold text-lg uppercase">Intensity</Label>
                <div className="flex flex-wrap gap-2">
                  {["Subtle", "Balanced", "Strong"].map((i) => (
                    <button 
                      key={i}
                      onClick={() => setIntensity(i)}
                      className={`px-3 py-1 font-bold text-sm uppercase border-2 transition-all ${intensity === i ? 'bg-secondary text-secondary-foreground border-black dark:border-white shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]' : 'bg-transparent border-black dark:border-white hover:bg-black/10 dark:hover:bg-white/10'}`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-2 border-black dark:border-white p-2">
                <Label className="font-bold uppercase cursor-pointer" htmlFor="grammar">Fix Grammar</Label>
                <Switch id="grammar" checked={grammarFix} onCheckedChange={setGrammarFix} className="data-[state=checked]:bg-primary border-2 border-black dark:border-white shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]" />
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleGenerate} 
            disabled={isGenerating || !input.trim()}
            className="brutalist-button w-full h-16 flex items-center justify-center text-xl disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_#000] dark:disabled:hover:shadow-[4px_4px_0_0_#fff]"
          >
            {isGenerating ? (
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            ) : null}
            {isGenerating ? "PROCESSING..." : "GENERATE"}
          </button>
        </div>

        {/* Text Areas */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between font-bold uppercase border-b-4 border-black dark:border-white pb-2">
              <span>Original Content</span>
              <span className="text-sm bg-black text-white dark:bg-white dark:text-black px-2 py-1">{input.length} CHARS</span>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="PASTE AI-GENERATED TEXT HERE..."
              className="brutalist-input flex-1 min-h-[400px] resize-none p-4 text-base"
            />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between font-bold uppercase border-b-4 border-black dark:border-white pb-2">
              <span>Humanized Result</span>
              <div className="flex items-center gap-2">
                <button className="border-2 border-black dark:border-white p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50" onClick={handleClear} disabled={!output && !input}>
                  <Trash2 className="w-5 h-5" />
                </button>
                <button className="border-2 border-black dark:border-white p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-50" onClick={handleCopy} disabled={!output}>
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="brutalist-input relative flex-1 min-h-[400px] p-4 overflow-hidden bg-accent/10">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center font-bold uppercase text-2xl"
                  >
                    <RefreshCw className="w-12 h-12 animate-spin mb-4" />
                    <span>REWRITING...</span>
                  </motion.div>
                ) : output ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base leading-relaxed whitespace-pre-wrap h-full overflow-y-auto"
                  >
                    {output}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center font-bold uppercase text-black/30 dark:text-white/30 text-center p-4"
                  >
                    <span>OUTPUT WILL APPEAR HERE</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
