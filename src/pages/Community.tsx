import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ScrollToTop from "@/components/ScrollToTop";
import { toast } from "sonner";
import {
  Search, Hash, TrendingUp, Clock, Heart, MessageSquare, Plus, X, Send,
} from "lucide-react";

interface Post {
  id: string;
  user_id: string;
  user_name: string;
  user_role: string;
  title: string;
  content: string;
  hashtags: string[];
  likes_count: number;
  created_at: string;
  liked_by_me?: boolean;
}

type SortMode = "recent" | "popular";

export default function Community() {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("recent");
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    let query = supabase
      .from("community_posts")
      .select("*")
      .order(sort === "popular" ? "likes_count" : "created_at", { ascending: false });

    const { data } = await query;
    if (!data) return;

    if (user) {
      const { data: likes } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", user.id);
      const likedIds = new Set(likes?.map((l) => l.post_id));
      setPosts(
        (data as Post[]).map((p) => ({ ...p, liked_by_me: likedIds.has(p.id) }))
      );
    } else {
      setPosts(data as Post[]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sort, user]);

  const filteredPosts = posts.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    if (q.startsWith("#")) {
      return p.hashtags?.some((h) => h.toLowerCase().includes(q.replace("#", "")));
    }
    return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
  });

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    setLoading(true);

    const tags = hashtags
      .split(",")
      .map((t) => t.trim().replace("#", ""))
      .filter(Boolean);

    const { error } = await supabase.from("community_posts").insert({
      user_id: user.id,
      user_name: profile.full_name || "Anônimo",
      user_role: profile.role,
      title,
      content,
      hashtags: tags,
    });

    if (error) {
      toast.error("Erro ao publicar");
    } else {
      toast.success("Post publicado!");
      setTitle("");
      setContent("");
      setHashtags("");
      setShowNew(false);
      fetchPosts();
    }
    setLoading(false);
  };

  const toggleLike = async (post: Post) => {
    if (!user) return;

    if (post.liked_by_me) {
      await supabase.from("post_likes").delete().eq("user_id", user.id).eq("post_id", post.id);
      await supabase
        .from("community_posts")
        .update({ likes_count: Math.max(0, post.likes_count - 1) })
        .eq("id", post.id);
    } else {
      await supabase.from("post_likes").insert({ user_id: user.id, post_id: post.id });
      await supabase
        .from("community_posts")
        .update({ likes_count: post.likes_count + 1 })
        .eq("id", post.id);
    }
    fetchPosts();
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}d`;
  };

  return (
    <div className="min-h-screen pt-16 pb-12">
      <ScrollToTop />
      <div className="container py-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold gradient-warm-text">Comunidade</h1>
          <p className="text-muted-foreground text-sm mt-3">Compartilhe conhecimento, tire dúvidas e conecte-se!</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar posts ou #hashtags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSort("recent")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                sort === "recent" ? "gradient-warm text-primary-foreground" : "glass text-muted-foreground"
              }`}
            >
              <Clock className="w-3.5 h-3.5" /> Recentes
            </button>
            <button
              onClick={() => setSort("popular")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                sort === "popular" ? "gradient-warm text-primary-foreground" : "glass text-muted-foreground"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Populares
            </button>
            <button
              onClick={() => setShowNew(!showNew)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-warm text-primary-foreground text-xs font-medium warm-glow-sm"
            >
              {showNew ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {showNew ? "Cancelar" : "Novo Post"}
            </button>
          </div>
        </div>

        {/* New Post Form */}
        <AnimatePresence>
          {showNew && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handlePost}
              className="glass p-5 mb-6 space-y-3 overflow-hidden"
            >
              <input
                type="text"
                placeholder="Título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Escreva seu post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="hashtags separadas por vírgula"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-lg gradient-warm text-primary-foreground text-sm font-medium warm-glow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Publicar
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.length === 0 && (
            <div className="glass p-8 text-center">
              <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Nenhum post encontrado. Seja o primeiro!</p>
            </div>
          )}
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-5 hover:border-primary/15 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{post.user_name || "Anônimo"}</span>
                  <span className="text-xs">{post.user_role === "professor" ? "👨‍🏫" : "🎓"}</span>
                </div>
                <span className="text-xs text-muted-foreground">{timeAgo(post.created_at)}</span>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">{post.title}</h3>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">{post.content}</p>
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.hashtags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setSearch(`#${tag}`)}
                      className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full cursor-pointer hover:bg-primary/20 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
                <button
                  onClick={() => toggleLike(post)}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    post.liked_by_me ? "text-pink-500" : "text-muted-foreground hover:text-pink-500"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.liked_by_me ? "fill-current" : ""}`} />
                  {post.likes_count}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
