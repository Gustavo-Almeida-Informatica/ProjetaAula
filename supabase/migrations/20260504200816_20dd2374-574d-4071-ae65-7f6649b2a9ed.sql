
ALTER TABLE public.community_posts ADD COLUMN IF NOT EXISTS image_url TEXT;

ALTER TABLE public.post_likes DROP CONSTRAINT IF EXISTS post_likes_post_id_fkey;
ALTER TABLE public.post_likes
  ADD CONSTRAINT post_likes_post_id_fkey
  FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE;

ALTER TABLE public.post_comments DROP CONSTRAINT IF EXISTS post_comments_post_id_fkey;
ALTER TABLE public.post_comments
  ADD CONSTRAINT post_comments_post_id_fkey
  FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE;

INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Post images publicly readable" ON storage.objects;
DROP POLICY IF EXISTS "Users upload own post images" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own post images" ON storage.objects;

CREATE POLICY "Post images publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

CREATE POLICY "Users upload own post images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users delete own post images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
