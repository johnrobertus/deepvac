/** Request Turnstile once, only after a visitor interacts with a form. */
export function ensureTurnstileScript(): void {
  if (typeof document === "undefined" || document.getElementById("cf-turnstile-script")) return;

  const script = document.createElement("script");
  script.id = "cf-turnstile-script";
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}