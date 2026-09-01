CREATE OR REPLACE FUNCTION public.set_typing_score_identity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE p_name text;
BEGIN
  NEW.user_id := COALESCE(auth.uid(), NEW.user_id);
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'user_id is required';
  END IF;
  SELECT full_name INTO p_name FROM public.profiles WHERE id = NEW.user_id;
  NEW.user_name := COALESCE(p_name, '');
  NEW.wpm := GREATEST(0, LEAST(NEW.wpm, 400));
  NEW.accuracy := GREATEST(0, LEAST(NEW.accuracy, 100));
  NEW.correct_words := GREATEST(0, LEAST(NEW.correct_words, 10000));
  NEW.wrong_words := GREATEST(0, LEAST(NEW.wrong_words, 10000));
  NEW.points := ROUND(NEW.wpm * NEW.accuracy / 100.0);
  RETURN NEW;
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.set_typing_score_identity() FROM anon, authenticated;