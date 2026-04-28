import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Zap, CloudSun, Calculator, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { predictEnergyBill } from "../lib/gemini";

interface PredictionResult {
  predictedCost: number;
  predictedCarbon: number;
  analysis: string;
  savingsTip: string;
}

export default function Analytics() {
  const [usage, setUsage] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!usage || isNaN(Number(usage))) {
      setError("Please enter a valid numeric usage value.");
      return;
    }
    setError(null);
    setIsPredicting(true);
    try {
      const result = await predictEnergyBill(Number(usage), city);
      setPrediction(result);
    } catch (err) {
      setError("Analysis failed. Ensure SmartGrid connection is active.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-white">Eco Analytics</h1>
        <p className="text-slate-muted">Advanced forecasting and resource optimization modules.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Prediction Input Card */}
        <section className="card-eco lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="text-emerald-accent" size={20} />
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Energy Bill Predictor</h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Input your current cycle's reading. Our AI will cross-reference local humidity, temperature, and grid load to forecast your final liability.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block mb-2">Primary City</label>
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-accent/50 text-white"
              >
                <option value="Mumbai">Mumbai (Tropical)</option>
                <option value="Delhi">Delhi (Extreme)</option>
                <option value="Bangalore">Bangalore (Moderate)</option>
                <option value="Chennai">Chennai (Coastal)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block mb-2">Recent Usage (kWh)</label>
              <input
                type="number"
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                placeholder="e.g. 145"
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-accent/50 text-white placeholder:text-slate-700"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-medium">
                <AlertCircle size={14} /> {error}
              </div>
            )}
            <button
              onClick={handlePredict}
              disabled={isPredicting || !usage}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-30"
            >
              {isPredicting ? <Sparkles size={18} className="animate-spin" /> : <Zap size={18} />}
              {isPredicting ? "Analyzing Grid Data..." : "Generate Prediction"}
            </button>
          </div>
        </section>

        {/* Prediction Results Card */}
        <section className="card-eco lg:col-span-7 flex flex-col items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!prediction ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4 opacity-20"
              >
                <TrendingUp size={64} className="mx-auto" />
                <p className="italic font-mono text-xs tracking-tighter uppercase">Waiting for data injection...</p>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-8">
                   <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-accent">Forecast Outcome</span>
                      <h3 className="text-sm font-bold text-slate-400">Month-End Estimate</h3>
                   </div>
                   <div className="flex items-center gap-2 text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full border border-emerald-accent/20">
                      <CloudSun size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Weather Adjusted</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Predicted Cost</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter">₹{prediction.predictedCost.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Carbon Impact</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter">{prediction.predictedCarbon} <span className="text-sm font-bold opacity-40">kg</span></p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-accent mb-2 flex items-center gap-1">
                      <Sparkles size={10} /> AI Narrative
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed italic">{prediction.analysis}</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-accent text-forest-deep rounded-2xl">
                    <Zap size={16} className="fill-current" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">Efficiency Pro-Tip</p>
                      <p className="text-xs font-bold">{prediction.savingsTip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Background decoration */}
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-accent/5 blur-[80px] rounded-full pointer-events-none" />
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-eco h-32 flex items-center justify-center italic text-[10px] uppercase tracking-widest font-mono">
            Encrypted Analysis Stream {i}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
