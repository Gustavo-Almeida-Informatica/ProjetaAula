import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  Monitor, Cpu, Image, Brain, Users, Home, LogOut, Menu, X, BookOpen, UserCircle,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Início", icon: Home },
  { to: "/historia", label: "História", icon: BookOpen },
  { to: "/hardware", label: "Hardware", icon: Cpu },
  { to: "/software", label: "Software", icon: Monitor },
  { to: "/galeria", label: "Conectores", icon: Image },
  { to: "/quiz", label: "Quiz", icon: Brain },
  { to: "/comunidade", label: "Comunidade", icon: Users },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/50">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-base font-bold gradient-warm-text">Projeta Aula</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-0.5">
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
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/8 border border-primary/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {profile && (
            <Link
              to="/perfil"
              className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-lg bg-secondary/50 hover:text-foreground transition-colors"
            >
              <UserCircle className="w-3.5 h-3.5" />
              {profile.role === "professor" ? "👨‍🏫" : "🎓"} {profile.full_name}
            </Link>
          )}
          <button onClick={signOut} className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-2xl border-t border-border/50 p-4 space-y-1"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                pathname === item.to ? "text-primary bg-primary/8" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border/50 pt-2 mt-2 space-y-1">
            <Link
              to="/perfil"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                pathname === "/perfil" ? "text-primary bg-primary/8" : "text-muted-foreground"
              }`}
            >
              <UserCircle className="w-4 h-4" />
              Meu Perfil
            </Link>
            <div className="flex items-center justify-between px-3">
              {profile && (
                <span className="text-xs text-muted-foreground">
                  {profile.role === "professor" ? "👨‍🏫" : "🎓"} {profile.full_name}
                </span>
              )}
              <button onClick={signOut} className="text-destructive text-sm">Sair</button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
