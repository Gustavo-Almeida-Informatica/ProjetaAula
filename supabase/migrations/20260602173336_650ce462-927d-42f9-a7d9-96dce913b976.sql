
CREATE OR REPLACE FUNCTION public.restrict_image_uploads()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ext text;
BEGIN
  IF NEW.bucket_id NOT IN ('avatars', 'post-images') THEN
    RETURN NEW;
  END IF;
  ext := lower(substring(NEW.name from '\.([^\.]+)$'));
  IF ext IS NULL OR ext NOT IN ('jpg','jpeg','png','gif','webp','heic','heif') THEN
    RAISE EXCEPTION 'Only image files (jpg, jpeg, png, gif, webp, heic, heif) are allowed in bucket %', NEW.bucket_id;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.restrict_image_uploads() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS restrict_image_uploads_trigger ON storage.objects;
CREATE TRIGGER restrict_image_uploads_trigger
  BEFORE INSERT OR UPDATE OF name, bucket_id ON storage.objects
  FOR EACH ROW EXECUTE FUNCTION public.restrict_image_uploads();
