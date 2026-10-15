DROP POLICY IF EXISTS "Quiz scores viewable by signed-in users" ON public.quiz_scores;
CREATE POLICY "Users can view own quiz score" ON public.quiz_scores
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Typing scores viewable by authenticated" ON public.typing_scores;
CREATE POLICY "Users can view own typing scores" ON public.typing_scores
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.get_quiz_leaderboard(_limit integer DEFAULT 10)
RETURNS TABLE(user_name text, user_role public.user_role, score integer)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT q.user_name, q.user_role, q.score
  FROM public.quiz_scores q
  ORDER BY q.score DESC
  LIMIT LEAST(GREATEST(_limit, 1), 50);
$$;
REVOKE ALL ON FUNCTION public.get_quiz_leaderboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_quiz_leaderboard(integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.get_typing_leaderboard(_limit integer DEFAULT 50)
RETURNS TABLE(user_name text, wpm integer, accuracy integer, points integer)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT t.user_name, t.wpm, t.accuracy, t.points
  FROM public.typing_scores t
  ORDER BY t.points DESC
  LIMIT LEAST(GREATEST(_limit, 1), 50);
$$;
REVOKE ALL ON FUNCTION public.get_typing_leaderboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_typing_leaderboard(integer) TO authenticated;