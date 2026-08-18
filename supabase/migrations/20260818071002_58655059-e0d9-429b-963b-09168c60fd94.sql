CREATE TABLE public.wealth_club_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'landing',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX wealth_club_members_email_key ON public.wealth_club_members (lower(email));

GRANT ALL ON public.wealth_club_members TO service_role;

ALTER TABLE public.wealth_club_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public read of wealth club members"
  ON public.wealth_club_members
  FOR SELECT
  TO authenticated
  USING (false);