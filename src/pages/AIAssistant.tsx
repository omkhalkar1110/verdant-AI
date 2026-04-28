import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Sparkles, RefreshCcw, Camera, Image as ImageIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { askEcoAssistant, analyzeEcoSwap } from "../lib/gemini";

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
        role: 'model', 
        parts: [{ text: "Hello! Based on your smart meter, your dishwasher is consuming 12% more energy than usual. Would you like to schedule a maintenance check or optimize your cycle time?" }] 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await askEcoAssistant(input, messages);
      const aiMessage: Message = { role: 'model', parts: [{ text: response || "I encounter an equilibrium error. Please rephrase." }] };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'model', parts: [{ text: "System Error: Unable to connect to Verdant Core. Please verify your surroundings." }] };
       setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result?.toString().split(',')[1];
      if (!base64) return;

      const userMessage: Message = { role: 'user', parts: [{ text: "[Image Uploaded for Eco-Swap Analysis]" }] };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      try {
        const response = await analyzeEcoSwap(base64);
        const aiMessage: Message = { role: 'model', parts: [{ text: response || "I couldn't analyze the object. My optic sensors are recalibrating." }] };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Visual Core Error: Analysis failed." }] }]);
      } finally {
        setIsTyping(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-14rem)] flex flex-col gap-6">
      <header className="flex items-center justify-between glass px-6 py-4 rounded-3xl border-white/5 bg-white/5">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-accent/20 flex items-center justify-center border border-emerald-accent/30 text-emerald-accent">
                <Bot size={22} />
            </div>
            <div>
                <h1 className="text-sm font-bold text-white uppercase tracking-tight">AI Coach Gaia</h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-accent">Online • Personalized Tips</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-500 hover:text-emerald-accent"
                title="Eco-Swap Vision"
            >
                <Camera size={18} />
            </button>
            <button 
                onClick={() => setMessages([messages[0]])}
                className="p-2 rounded-full hover:bg-white/5 transition-colors" title="Reset Session">
                <RefreshCcw size={18} className="text-slate-500" />
            </button>
        </div>
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
        />
      </header>

      <div 
        ref={scrollRef}
        className="flex-grow glass rounded-3xl overflow-y-auto p-8 space-y-6 scroll-smooth border-white/5"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-4 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    m.role === 'user' 
                    ? 'bg-emerald-accent text-forest-deep font-medium rounded-tr-none' 
                    : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                }`}>
                  <div className="markdown-body prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:text-white">
                    <ReactMarkdown>
                      {m.parts[0].text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
               <Sparkles size={14} className="text-emerald-accent animate-pulse" />
               <span className="text-xs font-mono tracking-tighter text-slate-500">Gaia is analyzing your smart-grid data...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="glass p-2 rounded-2xl flex items-center gap-2 border-white/5 bg-white/5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Gaia for eco-tips..."
          className="flex-grow px-6 py-4 bg-transparent focus:outline-none text-sm text-white placeholder:text-slate-600"
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="bg-emerald-accent text-forest-deep p-4 rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
