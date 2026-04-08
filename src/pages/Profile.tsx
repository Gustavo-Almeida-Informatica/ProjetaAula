import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Save, LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile || !user) return;
    setFullName(profile.full_name || "");
    // Fetch extended profile fields
    supabase
      .from("profiles")
      .select("phone, city")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setPhone((data as any).phone || "");
          setCity((data as any).city || "");
        }
      });
  }, [profile, user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone, city } as any)
      .eq("id", user.id);
    if (error) {
      toast.error("Erro ao salvar");
    } else {
      toast.success("Perfil atualizado!");
      await refreshProfile();
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen pt-16 pb-12">
      <ScrollToTop />
      <div className="container py-10 max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold gradient-warm-text">Meu Perfil</h1>
          <p className="text-muted-foreground text-sm mt-2">Edite suas informações pessoais</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 space-y-4">
          {/* Role badge */}
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold gradient-warm text-primary-foreground">
              {profile?.role === "professor" ? "👨‍🏫 Professor" : "🎓 Aluno"}
            </span>
          </div>

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Email (read-only) */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />
            <span className="absolute right-3 top-3.5 text-[10px] text-muted-foreground">não editável</span>
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              placeholder="Telefone (ex: 71 99999-0000)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* City */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-lg gradient-warm text-primary-foreground font-semibold text-sm warm-glow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </button>
        </motion.div>
      </div>
    </div>
  );
}
