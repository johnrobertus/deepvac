
CREATE TABLE public.inquiry_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text,
  status text NOT NULL DEFAULT 'pending',
  reason text,
  email text,
  payload_hash text,
  source text
);

ALTER TABLE public.inquiry_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_inquiry_logs_ip_created ON public.inquiry_logs (ip_address, created_at);
CREATE INDEX idx_inquiry_logs_payload_hash ON public.inquiry_logs (payload_hash, created_at);
