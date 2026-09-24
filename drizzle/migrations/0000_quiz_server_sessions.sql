CREATE TABLE public.quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  failed_at timestamptz,
  finished_at timestamptz,
  final_score integer
);
CREATE TABLE public.quiz_session_questions (
  session_id uuid NOT NULL REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  presented_at timestamptz NOT NULL DEFAULT now(),
  answered_at timestamptz,
  is_correct boolean,
  PRIMARY KEY (session_id, question_id)
);
CREATE INDEX quiz_sessions_user_idx ON public.quiz_sessions(user_id, created_at DESC);
GRANT ALL ON public.quiz_sessions TO service_role;
GRANT ALL ON public.quiz_session_questions TO service_role;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_session_questions ENABLE ROW LEVEL SECURITY;