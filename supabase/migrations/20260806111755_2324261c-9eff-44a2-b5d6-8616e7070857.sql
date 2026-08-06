REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.lock_post_immutable_fields() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.prevent_role_change() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.restrict_image_uploads() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_comment_identity() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_post_identity() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_typing_score_identity() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_likes_count() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_quiz_score() FROM anon, authenticated;

DROP POLICY IF EXISTS "Typing scores viewable by all" ON public.typing_scores;
CREATE POLICY "Typing scores viewable by authenticated"
ON public.typing_scores FOR SELECT TO authenticated USING (true);
REVOKE SELECT ON public.typing_scores FROM anon;