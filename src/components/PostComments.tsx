import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Send, Trash2, MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
}

export default function PostComments({ postId }: { postId: string }) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("post_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (data) setComments(data as Comment[]);
  };

  useEffect(() => {
    if (open) fetchComments();
  }, [open]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || !text.trim()) return;
    setSending(true);
    const { error } = await supabase.from("post_comments").insert({
      post_id: postId,
      user_id: user.id,
      user_name: profile.full_name || "Anônimo",
      content: text.trim(),
    });
    if (error) {
      toast.error("Erro ao comentar");
    } else {
      setText("");
      fetchComments();
    }
    setSending(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("post_comments").delete().eq("id", id);
    fetchComments();
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
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        {open ? "Fechar" : "Comentários"}
        {!open && comments.length > 0 && ` (${comments.length})`}
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2 bg-secondary/50 rounded-lg px-3 py-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">{c.user_name}</span>
                  <span className="text-[10px] text-muted-foreground">{timeAgo(c.created_at)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{c.content}</p>
              </div>
              {user && c.user_id === user.id && (
                <button onClick={() => handleDelete(c.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          {user && (
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Escreva um comentário..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={sending || !text.trim()}
                className="px-3 py-2 rounded-lg gradient-warm text-primary-foreground text-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
