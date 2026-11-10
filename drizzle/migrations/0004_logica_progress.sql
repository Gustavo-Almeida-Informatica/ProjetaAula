CREATE TABLE public.logica_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  item_id text NOT NULL CHECK (char_length(item_id) <= 64),
  kind text NOT NULL CHECK (kind IN ('lesson','exercise','project')),
  score integer NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.logica_progress TO authenticated;
GRANT ALL ON public.logica_progress TO service_role;
ALTER TABLE public.logica_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own select" ON public.logica_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own insert" ON public.logica_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own update" ON public.logica_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own delete" ON public.logica_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);