
CREATE POLICY "No public access to inquiry_logs" ON public.inquiry_logs FOR ALL USING (false);
