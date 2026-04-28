import { motion } from "motion/react";
import { Trophy, Medal, Star, Flame, Crown } from "lucide-react";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Arjun Mehta", score: 12450, impact: "2.4t CO2", badge: "Carbon King", avatar: "AM" },
  { rank: 2, name: "Priya Sharma", score: 11200, impact: "2.1t CO2", badge: "Solar Queen", avatar: "PS" },
  { rank: 3, name: "Zayn Sheikh", score: 9800, impact: "1.8t CO2", badge: "Zero Waste Pro", avatar: "ZS" },
  { rank: 4, name: "Ananya Iyer", score: 8500, impact: "1.5t CO2", badge: "Eco Warrior", avatar: "AI" },
  { rank: 5, name: "Vihaan Singh", score: 7200, impact: "1.2t CO2", badge: "Green Pioneer", avatar: "VS" },
];

export default function Leaderboard() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl mx-auto">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase italic">Elite Leaderboard</h1>
        <p className="text-slate-muted">The top 0.1% of India's sustainability pioneers.</p>
      </header>

      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
        {/* Silver */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-eco order-2 md:order-1 h-64 flex flex-col items-center justify-center p-6 border-slate-700/50"
        >
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold mb-4 border-2 border-slate-500 shadow-[0_0_20px_rgba(148,163,184,0.2)]">
                {LEADERBOARD_DATA[1].avatar}
            </div>
            <p className="text-sm font-bold text-white">{LEADERBOARD_DATA[1].name}</p>
            <p className="text-[10px] text-slate-500 uppercase font-black mb-2">{LEADERBOARD_DATA[1].impact} saved</p>
            <div className="bg-slate-700/50 px-3 py-1 rounded-full text-[10px] font-bold text-slate-300">Rank #2</div>
        </motion.div>

        {/* Gold */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-eco order-1 md:order-2 h-80 flex flex-col items-center justify-center p-6 border-amber-500/30 bg-amber-500/5 relative z-10"
        >
            <div className="absolute -top-6">
                <Crown size={48} className="text-amber-500 fill-amber-500/20 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>
            <div className="w-24 h-24 rounded-full bg-amber-500 flex items-center justify-center text-3xl font-black mb-4 border-4 border-amber-600/50 text-forest-deep shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                {LEADERBOARD_DATA[0].avatar}
            </div>
            <p className="text-lg font-black text-white italic tracking-tighter">{LEADERBOARD_DATA[0].name}</p>
            <p className="text-[10px] text-amber-500 uppercase font-black mb-2">{LEADERBOARD_DATA[0].impact} saved</p>
            <div className="bg-amber-500 text-forest-deep px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Carbon King</div>
        </motion.div>

        {/* Bronze */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-eco order-3 h-56 flex flex-col items-center justify-center p-6 border-orange-900/50"
        >
            <div className="w-16 h-16 rounded-full bg-orange-900/50 flex items-center justify-center text-xl font-bold mb-4 border-2 border-orange-700/50 shadow-[0_0_20px_rgba(154,52,18,0.2)]">
                {LEADERBOARD_DATA[2].avatar}
            </div>
            <p className="text-sm font-bold text-white">{LEADERBOARD_DATA[2].name}</p>
            <p className="text-[10px] text-slate-500 uppercase font-black mb-2">{LEADERBOARD_DATA[2].impact} saved</p>
            <div className="bg-orange-900/50 px-3 py-1 rounded-full text-[10px] font-bold text-orange-400">Rank #3</div>
        </motion.div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <div className="px-8 flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-2">
            <span>Global Pioneers</span>
            <span>Impact Score</span>
        </div>
        {LEADERBOARD_DATA.map((user, i) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass group hover:bg-white/10 transition-all rounded-2xl p-4 flex items-center justify-between border-white/5"
          >
            <div className="flex items-center gap-6">
                <span className="text-lg font-black text-slate-700 w-6 italic">#{user.rank}</span>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-slate-300">
                    {user.avatar}
                </div>
                <div>
                    <h4 className="font-bold text-white group-hover:text-emerald-accent transition-colors">{user.name}</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{user.badge}</span>
                </div>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                    <Flame size={14} className="text-orange-500" />
                    <span className="text-xl font-black text-white italic tracking-tighter">{user.score}</span>
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-accent/60 italic">{user.impact} CO2 offset</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card-eco bg-emerald-accent/5 border-emerald-accent/20 border-dashed text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Position: Top 4% — Keep growing your habitat to reach the Elite Tier.</p>
      </div>
    </motion.div>
  );
}
