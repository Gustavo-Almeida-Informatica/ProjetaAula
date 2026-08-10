CREATE POLICY "Public read access to post images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'post-images');