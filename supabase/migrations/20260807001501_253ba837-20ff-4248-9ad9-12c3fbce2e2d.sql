REVOKE ALL ON FUNCTION public.get_public_profiles(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_profiles(uuid[]) TO service_role;

REVOKE ALL ON FUNCTION public.increment_post_view(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_post_view(uuid) TO service_role;

DROP POLICY IF EXISTS "Users can insert own typing scores" ON public.typing_scores;
REVOKE INSERT ON public.typing_scores FROM authenticated, anon;
GRANT SELECT ON public.typing_scores TO authenticated;
GRANT ALL ON public.typing_scores TO service_role;