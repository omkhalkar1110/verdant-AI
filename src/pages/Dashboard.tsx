import { motion } from "motion/react";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Zap, Award, Activity, TreeDeciduous, TrendingDown, Trophy, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PIE_DATA = [
  { name: "Used", value: 65, color: "#88a096" },
  { name: "Remaining", value: 35, color: "#ecf0ef" },
];

export default function Dashboard() {
  const [energyData, setEnergyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/energy-data")
      .then(res => res.json())
      .then(data => {
        setEnergyData(data);
        setIsLoading(false);
      });
  }, []);

  const stats = [
    { label: "Carbon Offset", value: "2.4 tons", icon: TreeDeciduous, color: "text-emerald-accent" },
    { label: "Energy Savings", value: "12%", icon: TrendingDown, color: "text-blue-400" },
    { label: "Eco Score", value: "84/100", icon: Activity, color: "text-amber-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-slate-muted">Welcome back. Your environmental footprint is evolving.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-accent/10 border border-emerald-accent/20 rounded-2xl">
          <Award className="text-emerald-accent" size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-accent">Lvl 14 Expert</span>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-eco"
          >
            <div className={`p-2 w-fit rounded-lg bg-white/5 border border-white/5 ${stat.color} mb-4`}>
              <stat.icon size={22} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-1 text-white">{stat.value}</h3>
          </motion.div>
        ))}
        {/* Leaderboard Teaser */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-eco border-amber-500/20 bg-amber-500/5 group cursor-pointer relative overflow-hidden"
        >
            <Link to="/leaderboard" className="block">
                <div className="p-2 w-fit rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4 transition-transform group-hover:scale-110">
                    <Trophy size={22} />
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500/60">Global Rank</p>
                        <h3 className="text-3xl font-black mt-1 text-white italic">#1,242</h3>
                    </div>
                    <ArrowRight size={20} className="text-amber-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </div>
            </Link>
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl rounded-full translate-x-12 -translate-y-12" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Carbon Footprint Tracker */}
        <section className="card-eco lg:col-span-4 flex flex-col items-center justify-center text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 w-full text-left">Current Monthly Impact</h2>
          <div className="h-48 w-48 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Met", value: 75, color: "#10b981" },
                    { name: "Remaining", value: 25, color: "rgba(255,255,255,0.05)" },
                  ]}
                  innerRadius={65}
                  outerRadius={85}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {[
                    { name: "Met", value: 75, color: "#10b981" },
                    { name: "Remaining", value: 25, color: "rgba(255,255,255,0.05)" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">75%</span>
              <span className="text-[10px] font-bold uppercase text-emerald-accent tracking-tighter">Target Met</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-300">1.2 Tons CO₂ saved this period</p>
        </section>

        {/* Energy Usage Prediction */}
        <section className="card-eco lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Energy Prediction Analysis</h2>
            <Zap size={16} className="text-emerald-accent" />
          </div>
          <div className="h-64">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center opacity-20 italic font-mono text-xs">Processing SmartGrid Data...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: "#64748b" }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: "#64748b" }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                        backgroundColor: "#0D1F16", 
                        border: "1px solid rgba(255,255,255,0.1)", 
                        borderRadius: "16px",
                        fontSize: "12px",
                        color: "#fff"
                    }} 
                    itemStyle={{ color: "#10b981" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#475569" 
                    strokeWidth={2} 
                    dot={false}
                    strokeDasharray="4 4"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-accent"></span> Actual Use
            </div>
            <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> Smart Prediction
            </div>
          </div>
        </section>
      </div>

      {/* Gamified Goals & Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="card-eco lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Sustainable Goals & Digital Forest</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-accent/20 rounded-full border border-emerald-accent/30">
               <span className="text-[10px] font-black text-emerald-accent uppercase tracking-widest">12 Day Streak</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-accent/20 rounded-xl flex items-center justify-center text-emerald-accent">
                      <Award size={24} />
                  </div>
                  <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-white text-sm">Plastic Free Week</h4>
                        <span className="text-xs font-bold text-emerald-accent">80%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "80%" }}
                            className="h-full bg-emerald-accent shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                          />
                      </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Bike KM</span>
                    <span className="text-xl font-bold text-white">4.2 / 10</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Carbon Saved</span>
                    <span className="text-xl font-bold text-white">12.4 kg</span>
                  </div>
               </div>
            </div>

            {/* Digital Forest Visualization */}
            <div className="relative glass rounded-2xl border-white/5 p-6 flex flex-col items-center justify-center overflow-hidden">
                <div className="relative z-10 text-center">
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <TreeDeciduous size={80} className="text-emerald-accent mx-auto filter drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
                    </motion.div>
                    <p className="mt-4 text-sm font-bold text-white">Flourishing</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Current Eco-Habitat Status</p>
                </div>
                {/* Background "Glow" */}
                <div className="absolute inset-0 bg-emerald-accent/5 blur-3xl rounded-full" />
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-6">
          {/* Smart Grid Optimizer */}
          <div className="card-eco border-emerald-accent/20 bg-emerald-accent/5">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-accent">Smart Grid Optimizer</h3>
                <Zap size={14} className="text-emerald-accent animate-pulse" />
             </div>
             <div className="space-y-4">
                <div className="p-3 bg-forest-deep rounded-xl border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter mb-1">Optimal Window</p>
                    <p className="text-sm font-bold text-white">10:00 PM - 04:00 AM</p>
                    <p className="text-[9px] text-emerald-accent mt-1">High Renewable Surplus (84%)</p>
                </div>
                <button className="w-full py-2 border border-emerald-accent/30 text-emerald-accent rounded-lg text-[10px] font-bold uppercase hover:bg-emerald-accent/10 transition-all">
                    Schedule Appliances
                </button>
             </div>
          </div>

          <div className="bg-emerald-accent rounded-3xl p-6 flex flex-col justify-between shadow-emerald-500/20 shadow-2xl">
            <div>
              <h3 className="text-forest-deep font-black text-lg uppercase tracking-tight">Weekly Status</h3>
              <p className="text-forest-deep/70 text-sm mt-1 leading-tight font-medium">Your footprint is down 4% compared to the previous cycle.</p>
            </div>
            <div className="mt-8">
              <div className="w-full h-24 bg-forest-deep/10 rounded-2xl mb-4 flex items-end p-2 gap-1 overflow-hidden">
                 {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                   <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1 }}
                      className="flex-1 bg-forest-deep/30 rounded-t-sm"
                   />
                 ))}
              </div>
              <button className="w-full py-3 bg-forest-deep text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                Generate Report
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
