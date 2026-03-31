import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  Monitor, Cpu, Image, Brain, Users, Home, LogOut, Menu, X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/hardware", label: "Hardware", icon: Cpu },
  { to: "/software", label: "Software", icon: Monitor },
  { to: "/galeria", label: "Galeria", icon: Image },
  { to: "/quiz", label: "Quiz", icon: Brain },
  { to: "/comunidade", label: "Comunidade", icon: Users },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-bold gradient-neon-text">CETEP</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">Informática</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {profile && (
            <span className="text-xs glass px-3 py-1.5">
              {profile.role === "professor" ? "👨‍🏫" : "🎓"} {profile.full_name}
            </span>
          )}
          <button onClick={signOut} className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong border-t border-border p-4 space-y-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                pathname === item.to ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
            {profile && (
              <span className="text-xs text-muted-foreground">
                {profile.role === "professor" ? "👨‍🏫" : "🎓"} {profile.full_name}
              </span>
            )}
            <button onClick={signOut} className="text-destructive text-sm">Sair</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
