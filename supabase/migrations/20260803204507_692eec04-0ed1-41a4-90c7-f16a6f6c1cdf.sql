ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS keyboard_layout text;

CREATE TABLE IF NOT EXISTS public.typing_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text not null default '',
  wpm integer not null default 0,
  accuracy integer not null default 0,
  points integer not null default 0,
  correct_words integer not null default 0,
  wrong_words integer not null default 0,
  created_at timestamptz not null default now()
);

GRANT SELECT, INSERT ON public.typing_scores TO authenticated;
GRANT SELECT ON public.typing_scores TO anon;
GRANT ALL ON public.typing_scores TO service_role;

ALTER TABLE public.typing_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Typing scores viewable by all" ON public.typing_scores FOR SELECT USING (true);
CREATE POLICY "Users can insert own typing scores" ON public.typing_scores FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_typing_score_identity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE p_name text;
BEGIN
  SELECT full_name INTO p_name FROM public.profiles WHERE id = auth.uid();
  NEW.user_id := auth.uid();
  NEW.user_name := COALESCE(p_name, '');
  NEW.wpm := GREATEST(0, LEAST(NEW.wpm, 400));
  NEW.accuracy := GREATEST(0, LEAST(NEW.accuracy, 100));
  NEW.correct_words := GREATEST(0, LEAST(NEW.correct_words, 10000));
  NEW.wrong_words := GREATEST(0, LEAST(NEW.wrong_words, 10000));
  NEW.points := ROUND(NEW.wpm * NEW.accuracy / 100.0);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS typing_scores_set_identity ON public.typing_scores;
CREATE TRIGGER typing_scores_set_identity BEFORE INSERT ON public.typing_scores
FOR EACH ROW EXECUTE FUNCTION public.set_typing_score_identity();