import { motion } from "motion/react";
import { MapPin, Droplets, Leaf, Store, Compass } from "lucide-react";

const LOCAL_HUBS = [
  { name: "Urban Compost Hub", type: "Compost Bin", location: "Bandra West, Mumbai", dist: "1.2 km", icon: Leaf },
  { name: "EcoFill Station #42", type: "Water Refill", location: "Khar Road, Mumbai", dist: "0.8 km", icon: Droplets },
  { name: "The Zero Waste Shop", type: "Sustainable Store", location: "Juhu, Mumbai", dist: "2.5 km", icon: Store },
  { name: "Green Park Community Hub", type: "Recycling Center", location: "Andheri East, Mumbai", dist: "4.1 km", icon: MapPin },
];

export default function Community() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-white">Eco Community</h1>
        <p className="text-slate-muted">Connect, share, and find sustainable hubs in your proximity.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Local Green Map */}
        <section className="card-eco lg:col-span-12 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-2">
                <Compass className="text-emerald-accent" size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">Hyper-Local Green Map</h2>
             </div>
             <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-accent bg-emerald-accent/10 px-3 py-1 rounded-full border border-emerald-accent/20">
                Live Proximity Active
             </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 h-96">
            {/* Mock Map Visualization */}
            <div className="flex-grow bg-white/5 rounded-2xl border border-white/5 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-122.4241,37.78,14.25,0,0/600x400?access_token=pk.eyJ1IjoiYm90IiwiYSI6ImNrY2VnZj'] bg-cover grayscale" />
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-32 h-32 bg-emerald-accent/20 rounded-full flex items-center justify-center"
                    >
                        <div className="w-16 h-16 bg-emerald-accent/40 rounded-full flex items-center justify-center">
                            <MapPin size={32} className="text-emerald-accent fill-current" />
                        </div>
                    </motion.div>
                    <p className="mt-4 text-xs font-mono tracking-tighter text-slate-500 uppercase">Triangulating nearby Eco-Hubs...</p>
                </div>
            </div>

            {/* Hub List */}
            <div className="w-full md:w-80 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                {LOCAL_HUBS.map((hub, i) => (
                    <motion.div 
                        key={hub.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-emerald-accent/20 text-emerald-accent group-hover:scale-110 transition-transform">
                                <hub.icon size={16} />
                            </div>
                            <div className="flex-grow min-w-0">
                                <h4 className="text-sm font-bold text-white truncate">{hub.name}</h4>
                                <p className="text-[10px] text-slate-500 uppercase tracking-tight">{hub.type}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-[9px] font-bold text-emerald-accent/60">{hub.dist}</span>
                                    <span className="text-[9px] text-slate-600 truncate">{hub.location}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>
        </section>

        <section className="card-eco lg:col-span-12 text-center py-16 space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Join the movement.</h2>
            <p className="text-slate-400 text-sm leading-relaxed px-8">
              Verdant is more than an app; it's a collective consciousness. Connect with an elite network of sustainability pioneers and share your journey towards a Net Zero legacy.
            </p>
            <div className="pt-4">
               <button className="btn-primary uppercase tracking-[0.2em] text-xs px-12">
                  Launch Community Agora
               </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
