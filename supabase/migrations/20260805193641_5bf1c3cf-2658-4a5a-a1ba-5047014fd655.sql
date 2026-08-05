ALTER TABLE public.community_posts ADD COLUMN IF NOT EXISTS views_count integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.get_public_profiles(_ids uuid[])
RETURNS TABLE (id uuid, full_name text, avatar_url text, city text, role public.user_role)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.full_name, p.avatar_url, NULLIF(p.city, ''), p.role
  FROM public.profiles p
  WHERE p.id = ANY(_ids)
$$;

REVOKE ALL ON FUNCTION public.get_public_profiles(uuid[]) FROM public;
GRANT EXECUTE ON FUNCTION public.get_public_profiles(uuid[]) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.increment_post_view(_post_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.community_posts SET views_count = views_count + 1 WHERE id = _post_id;
$$;

REVOKE ALL ON FUNCTION public.increment_post_view(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.increment_post_view(uuid) TO anon, authenticated;