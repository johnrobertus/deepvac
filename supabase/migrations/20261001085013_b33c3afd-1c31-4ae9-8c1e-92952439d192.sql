DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'purge-inquiry-logs-30d') THEN
    PERFORM cron.unschedule('purge-inquiry-logs-30d');
  END IF;
END $$;

SELECT cron.schedule(
  'purge-inquiry-logs-30d',
  '17 3 * * *',
  $$delete from public.inquiry_logs where created_at < now() - interval '30 days'$$
);