
REVOKE EXECUTE ON FUNCTION public.prevent_role_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_post_identity() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_comment_identity() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.lock_post_immutable_fields() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_likes_count() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_quiz_score() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Post images publicly readable" ON storage.objects;
