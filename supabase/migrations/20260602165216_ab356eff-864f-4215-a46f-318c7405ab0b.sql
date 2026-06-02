
-- 1. Prevent self role change on profiles
CREATE OR REPLACE FUNCTION public.prevent_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    NEW.role := OLD.role;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_role_change ON public.profiles;
CREATE TRIGGER profiles_prevent_role_change
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_role_change();

-- 2. Lock down user_name/user_role in community_posts and post_comments (insert and update)
CREATE OR REPLACE FUNCTION public.set_post_identity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  p_name text;
  p_role public.user_role;
BEGIN
  SELECT full_name, role INTO p_name, p_role
  FROM public.profiles WHERE id = auth.uid();
  NEW.user_id := auth.uid();
  NEW.user_name := COALESCE(p_name, '');
  NEW.user_role := COALESCE(p_role, 'aluno'::public.user_role);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS community_posts_set_identity ON public.community_posts;
CREATE TRIGGER community_posts_set_identity
BEFORE INSERT ON public.community_posts
FOR EACH ROW
EXECUTE FUNCTION public.set_post_identity();

CREATE OR REPLACE FUNCTION public.set_comment_identity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  p_name text;
BEGIN
  SELECT full_name INTO p_name FROM public.profiles WHERE id = auth.uid();
  NEW.user_id := auth.uid();
  NEW.user_name := COALESCE(p_name, '');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS post_comments_set_identity ON public.post_comments;
CREATE TRIGGER post_comments_set_identity
BEFORE INSERT ON public.post_comments
FOR EACH ROW
EXECUTE FUNCTION public.set_comment_identity();

-- 3. Prevent likes_count manipulation and recompute it from post_likes
CREATE OR REPLACE FUNCTION public.lock_post_immutable_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.likes_count := OLD.likes_count;
  NEW.user_id := OLD.user_id;
  NEW.user_name := OLD.user_name;
  NEW.user_role := OLD.user_role;
  NEW.created_at := OLD.created_at;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS community_posts_lock_fields ON public.community_posts;
CREATE TRIGGER community_posts_lock_fields
BEFORE UPDATE ON public.community_posts
FOR EACH ROW
EXECUTE FUNCTION public.lock_post_immutable_fields();

CREATE OR REPLACE FUNCTION public.sync_likes_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_post uuid;
BEGIN
  target_post := COALESCE(NEW.post_id, OLD.post_id);
  UPDATE public.community_posts
     SET likes_count = (SELECT COUNT(*) FROM public.post_likes WHERE post_id = target_post)
   WHERE id = target_post;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS post_likes_sync_count ON public.post_likes;
CREATE TRIGGER post_likes_sync_count
AFTER INSERT OR DELETE ON public.post_likes
FOR EACH ROW
EXECUTE FUNCTION public.sync_likes_count();

-- 4. Cap quiz scores to a reasonable range to prevent leaderboard abuse
CREATE OR REPLACE FUNCTION public.validate_quiz_score()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  p_name text;
  p_role public.user_role;
BEGIN
  IF NEW.score < 0 OR NEW.score > 1000 THEN
    RAISE EXCEPTION 'Invalid score value';
  END IF;
  SELECT full_name, role INTO p_name, p_role
  FROM public.profiles WHERE id = auth.uid();
  NEW.user_id := auth.uid();
  NEW.user_name := COALESCE(p_name, '');
  NEW.user_role := COALESCE(p_role, 'aluno'::public.user_role);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS quiz_scores_validate ON public.quiz_scores;
CREATE TRIGGER quiz_scores_validate
BEFORE INSERT ON public.quiz_scores
FOR EACH ROW
EXECUTE FUNCTION public.validate_quiz_score();

-- 5. Add UPDATE policy to post-images storage bucket
CREATE POLICY "Users update own post images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'post-images' AND (auth.uid())::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'post-images' AND (auth.uid())::text = (storage.foldername(name))[1]);

-- 6. Revoke EXECUTE on handle_new_user (only used as auth trigger)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
