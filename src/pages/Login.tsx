import { motion } from "motion/react";
import { LogIn, Github, Mail, ShieldCheck, Leaf } from "lucide-react";
import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-deep px-4 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-accent/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-accent/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[32px] w-full max-w-md relative z-10 border-white/5"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 bg-emerald-accent rounded-2xl flex items-center justify-center text-forest-deep mb-6 shadow-xl shadow-emerald-500/20">
            <Leaf size={32} className="fill-current" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Verdant AI</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Sophisticated sustainability at your fingertips.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Identity</label>
            <div className="relative">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/5 focus:outline-none focus:border-emerald-accent/50 text-white placeholder:text-slate-700 transition-all text-sm"
                    placeholder="name@prime.com"
                />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Access Code</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/5 focus:outline-none focus:border-emerald-accent/50 text-white placeholder:text-slate-700 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-emerald-accent text-forest-deep py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-[0.98] mt-4"
          >
            Authenticate
          </button>
        </form>

        <div className="my-10 flex items-center gap-4">
            <div className="h-[1px] flex-grow bg-white/5"></div>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Network Access</span>
            <div className="h-[1px] flex-grow bg-white/5"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all text-xs font-bold text-slate-300">
            <Mail size={16} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all text-xs font-bold text-slate-300">
            <Github size={16} /> GitHub
          </button>
        </div>
      </motion.div>
    </div>
  );
}
