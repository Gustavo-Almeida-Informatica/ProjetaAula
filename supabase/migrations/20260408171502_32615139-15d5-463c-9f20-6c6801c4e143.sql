
-- Comments table
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments viewable by all" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can create own comments" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.post_comments FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_post_comments_post_id ON public.post_comments(post_id);

-- Add phone and city to profiles
ALTER TABLE public.profiles ADD COLUMN phone TEXT DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN city TEXT DEFAULT '';
