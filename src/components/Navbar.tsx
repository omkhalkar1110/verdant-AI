import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, BarChart3, Users, MessageSquare, Trophy, Moon, Sun, Leaf } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

interface NavbarProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function Navbar({ toggleDarkMode, isDarkMode }: NavbarProps) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Marketplace", path: "/marketplace", icon: ShoppingBag },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Community", path: "/community", icon: Users },
    { name: "AI Coach", path: "/ai-coach", icon: MessageSquare },
    { name: "Leaders", path: "/leaderboard", icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center px-6 justify-between border-b border-white/5">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 bg-emerald-accent rounded-lg flex items-center justify-center"
        >
          <Leaf className="text-forest-deep w-5 h-5 fill-current" />
        </motion.div>
        <span className="font-bold text-xl tracking-tight text-white uppercase">
          Verdant AI
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link text-sm font-medium transition-colors",
                isActive && "nav-link-active"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-700 border border-white/20 hidden sm:block"></div>
      </div>
    </nav>
  );
}
