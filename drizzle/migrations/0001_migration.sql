DROP POLICY IF EXISTS "Quiz scores viewable by all" ON public.quiz_scores;
REVOKE SELECT ON public.quiz_scores FROM anon;
CREATE POLICY "Quiz scores viewable by signed-in users" ON public.quiz_scores FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);