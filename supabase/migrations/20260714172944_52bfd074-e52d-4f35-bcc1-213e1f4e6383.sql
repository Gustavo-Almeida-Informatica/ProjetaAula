
-- Attach sync_likes_count trigger so likes update automatically via SECURITY DEFINER
DROP TRIGGER IF EXISTS trg_sync_likes_count_ins ON public.post_likes;
DROP TRIGGER IF EXISTS trg_sync_likes_count_del ON public.post_likes;

CREATE TRIGGER trg_sync_likes_count_ins
AFTER INSERT ON public.post_likes
FOR EACH ROW EXECUTE FUNCTION public.sync_likes_count();

CREATE TRIGGER trg_sync_likes_count_del
AFTER DELETE ON public.post_likes
FOR EACH ROW EXECUTE FUNCTION public.sync_likes_count();

-- Resync existing likes counts
UPDATE public.community_posts p
SET likes_count = COALESCE((SELECT COUNT(*) FROM public.post_likes l WHERE l.post_id = p.id), 0);
