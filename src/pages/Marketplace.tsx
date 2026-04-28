import { motion } from "motion/react";
import { ShoppingCart, Star, Leaf, ExternalLink } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Bamboo Minimalist Watch",
    brand: "Vaayu",
    price: "₹8,499",
    score: 94,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Recycled Ocean Plastic Tote",
    brand: "Neela",
    price: "₹1,250",
    score: 98,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Organic Hemp Sneakers",
    brand: "Mitti",
    price: "₹4,999",
    score: 89,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Solar-Powered Portable Charger",
    brand: "SuryaVolt",
    price: "₹3,200",
    score: 91,
    image: "https://images.unsplash.com/photo-1617788131756-1138944f7626?auto=format&fit=crop&q=80&w=400",
  },
];

export default function Marketplace() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Eco Marketplace</h1>
        <p className="text-forest/60 dark:text-eco-white/60">Curated products for a conscious lifestyle.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-eco p-0 overflow-hidden group"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-900 flex items-center justify-center">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-emerald-accent/20 border border-emerald-accent/30 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1">
                    <Leaf size={10} className="text-emerald-accent fill-current" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-accent">{product.score} SCORE</span>
                </div>
                <button className="absolute bottom-3 right-3 p-3 rounded-full bg-emerald-accent text-forest-deep shadow-xl translate-y-16 group-hover:translate-y-0 transition-all duration-500 hover:scale-110">
                    <ShoppingCart size={18} />
                </button>
            </div>
            <div className="p-5 space-y-3">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">{product.brand}</p>
                    <h3 className="font-bold text-white text-base leading-tight group-hover:text-emerald-accent transition-colors">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between items-end">
                    <span className="text-xl font-black text-white">{product.price}</span>
                    <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                        Check Price <ExternalLink size={12} />
                    </button>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
