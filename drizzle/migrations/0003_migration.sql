CREATE TABLE IF NOT EXISTS public.post_views (
  post_id uuid NOT NULL,
  user_id uuid NOT NULL,
  viewed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);
ALTER TABLE public.post_views ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.post_views FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.post_views TO service_role;

CREATE OR REPLACE FUNCTION public.increment_post_view_once(_post_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE inserted int;
BEGIN
  INSERT INTO public.post_views(post_id, user_id) VALUES (_post_id, _user_id)
  ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS inserted = ROW_COUNT;
  IF inserted = 0 THEN RETURN false; END IF;
  PERFORM public.increment_post_view(_post_id);
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.increment_post_view_once(uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_post_view_once(uuid, uuid) TO service_role;