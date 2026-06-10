
-- Remove client-side INSERT access on quiz_scores; only server-side (service_role) inserts allowed.
DROP POLICY IF EXISTS "Users can insert own scores" ON public.quiz_scores;
REVOKE INSERT ON public.quiz_scores FROM authenticated, anon;

-- Update trigger so it works for service_role inserts (auth.uid() is null) while still validating score range.
CREATE OR REPLACE FUNCTION public.validate_quiz_score()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  p_name text;
  p_role public.user_role;
BEGIN
  IF NEW.score < 0 OR NEW.score > 1000 THEN
    RAISE EXCEPTION 'Invalid score value';
  END IF;
  IF auth.uid() IS NOT NULL THEN
    SELECT full_name, role INTO p_name, p_role
    FROM public.profiles WHERE id = auth.uid();
    NEW.user_id := auth.uid();
    NEW.user_name := COALESCE(p_name, '');
    NEW.user_role := COALESCE(p_role, 'aluno'::public.user_role);
  END IF;
  RETURN NEW;
END;
$function$;
