CREATE OR REPLACE FUNCTION public.record_quiz_high_score(
  _user_id uuid,
  _user_name text,
  _user_role public.user_role,
  _score integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  saved_score integer;
BEGIN
  IF _user_id IS NULL OR _score < 1 OR _score > 1000 THEN
    RAISE EXCEPTION 'Invalid quiz score';
  END IF;

  INSERT INTO public.quiz_scores (user_id, user_name, user_role, score)
  VALUES (_user_id, COALESCE(_user_name, ''), COALESCE(_user_role, 'aluno'::public.user_role), _score)
  ON CONFLICT (user_id) DO UPDATE
  SET score = GREATEST(public.quiz_scores.score, EXCLUDED.score),
      user_name = EXCLUDED.user_name,
      user_role = EXCLUDED.user_role
  RETURNING score INTO saved_score;

  RETURN saved_score;
END;
$$;

REVOKE ALL ON FUNCTION public.record_quiz_high_score(uuid, text, public.user_role, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_quiz_high_score(uuid, text, public.user_role, integer) TO service_role;