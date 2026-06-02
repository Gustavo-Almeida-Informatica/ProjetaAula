
ALTER TABLE public.community_posts
  ADD CONSTRAINT image_url_origin CHECK (
    image_url IS NULL OR
    image_url LIKE 'https://lsoymhlmlopmszvqdvsu.supabase.co/storage/%'
  ),
  ADD CONSTRAINT title_length CHECK (char_length(title) <= 200),
  ADD CONSTRAINT content_length CHECK (char_length(content) <= 10000),
  ADD CONSTRAINT hashtags_limit CHECK (
    coalesce(array_length(hashtags, 1), 0) <= 20
  );

ALTER TABLE public.post_comments
  ADD CONSTRAINT content_length CHECK (char_length(content) <= 2000);

ALTER TABLE public.profiles
  ADD CONSTRAINT full_name_length CHECK (char_length(full_name) <= 120),
  ADD CONSTRAINT phone_length CHECK (phone IS NULL OR char_length(phone) <= 32),
  ADD CONSTRAINT city_length CHECK (city IS NULL OR char_length(city) <= 120);
