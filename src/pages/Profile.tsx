import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ScrollToTop from "@/components/ScrollToTop";
import { Seo } from "@/components/Seo";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User, Mail, MapPin, Save, LogOut, Camera, Heart, MessageSquare, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MyPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  created_at: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!profile || !user) return;
    setFullName(profile.full_name || "");
    setAvatarUrl(profile.avatar_url || null);
    supabase
      .from("profiles")
      .select("city")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setCity((data as any).city || "");
        }
      });
  }, [profile, user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione apenas arquivos de imagem");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 2MB");
      return;
    }

    setUploading(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      // Remove any previous avatar files (any extension) to avoid stale copies
      const { data: existing } = await supabase.storage.from("avatars").list(user.id);
      if (existing && existing.length > 0) {
        await supabase.storage
          .from("avatars")
          .remove(existing.map((f) => `${user.id}/${f.name}`));
      }

      const filePath = `${user.id}/avatar-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type || `image/${ext}`,
          cacheControl: "3600",
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setAvatarUrl(`${publicUrl}?t=${Date.now()}`);
      await refreshProfile();
      toast.success("Foto de perfil atualizada!");
    } catch (err: any) {
      console.error("Avatar upload error:", err);
      toast.error(err?.message || "Erro ao enviar foto");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, city } as any)
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  // Postagens do usuário na comunidade
  const [myPosts, setMyPosts] = useState<MyPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("community_posts")
        .select("id, title, content, image_url, likes_count, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!active) return;
      setMyPosts((data as MyPost[]) ?? []);
      setPostsLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const [postToDelete, setPostToDelete] = useState<MyPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeletePost = async () => {
    if (!postToDelete || !user) return;
    setDeleting(true);
    const { error } = await supabase
      .from("community_posts")
      .delete()
      .eq("id", postToDelete.id)
      .eq("user_id", user.id);
    setDeleting(false);
    if (error) {
      toast.error("Erro ao excluir postagem");
      return;
    }
    setMyPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
    setPostToDelete(null);
    toast.success("Postagem excluída!");
  };

  return (
    <div className="min-h-screen pt-16 pb-12">
      <Seo
        title="Meu Perfil | Projeta Aula"
        description="Edite suas informações pessoais e gerencie sua conta na plataforma Projeta Aula."
        path="/perfil"
      />
      <ScrollToTop />
      <div className="container py-10 max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold gradient-warm-text">Meu Perfil</h1>
          <p className="text-muted-foreground text-sm mt-2">Edite suas informações pessoais</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={fullName} />
                ) : null}
                <AvatarFallback className="text-lg font-bold gradient-warm text-primary-foreground">
                  {getInitials(fullName || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
              {uploading && (
                <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-primary hover:underline"
              disabled={uploading}
            >
              {uploading ? "Enviando..." : "Trocar Foto"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
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

        {/* Minhas postagens na comunidade */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass p-6 mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Minhas Postagens
            </h2>
            <Link to="/comunidade" className="text-xs text-primary hover:underline">
              Ir para a Comunidade
            </Link>
          </div>

          {postsLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : myPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Você ainda não publicou nada na comunidade.
            </p>
          ) : (
            <ul className="space-y-3">
              {myPosts.map((p) => (
                <li
                  key={p.id}
                  className="p-4 rounded-xl bg-secondary/30 border border-border/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <time
                        dateTime={p.created_at}
                        className="text-[11px] text-muted-foreground"
                      >
                        {new Date(p.created_at).toLocaleDateString("pt-BR")}
                      </time>
                      <button
                        type="button"
                        onClick={() => setPostToDelete(p)}
                        aria-label="Excluir postagem"
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-3 whitespace-pre-wrap">
                    {p.content}
                  </p>
                  {p.image_url && (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      loading="lazy"
                      className="mt-3 w-full aspect-video object-cover rounded-lg border border-border/30"
                    />
                  )}
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="w-3.5 h-3.5" />
                    {p.likes_count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      </div>

      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir esta postagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A postagem será removida permanentemente da comunidade.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeletePost();
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

