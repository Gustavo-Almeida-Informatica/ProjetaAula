ALTER TABLE public.quiz_scores
ADD CONSTRAINT quiz_scores_user_id_key UNIQUE (user_id);