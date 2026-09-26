# CloudTronix Website

Premium React + Vite corporate website for CloudTronix.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The contact form uses environment variables for EmailJS and Google reCAPTCHA V2.

```bash
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_CUSTOMER_SERVICE_ID=
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=
VITE_EMAILJS_INTERNAL_SERVICE_ID=
VITE_EMAILJS_INTERNAL_TEMPLATE_ID=
VITE_INTERNAL_NOTIFICATION_EMAIL=info@cloudtronix.in
VITE_RECAPTCHA_SITE_KEY=
```

Create `.env.local` from `.env.example`, add real keys there, and restart `npm run dev`.

Project cards link to `/contact?project=...` to prefill the editable Project Name field. Direct enquiries can enter a project name manually. The selected name persists when refreshing that link.

In both EmailJS dashboard templates, replace the Interested Industry row with `Project Name: {{project_name}}`. The form sends `project_name` (and the `projectName` alias) with both emails.
