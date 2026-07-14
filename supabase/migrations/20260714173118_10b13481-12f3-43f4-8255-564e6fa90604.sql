
CREATE POLICY "Users can list their own avatar"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'avatars' AND (auth.uid())::text = (storage.foldername(name))[1]);
