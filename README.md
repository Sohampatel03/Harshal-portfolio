# Harshal Gunjal — Data & Business Analyst

A responsive portfolio built with Next.js App Router. The site highlights Harshal's analytics experience, skills, projects, education and contact details.

## Run locally

```bash
pnpm install
pnpm dev
```

## Contact form configuration

Copy `.env.example` to `.env.local` and configure these server-only variables:

```env
EMAIL_ADDRESS=
GMAIL_PASSKEY=
CLIENT_EMAIL=
```

The form sends through Gmail SMTP with Nodemailer. `EMAIL_ADDRESS` and `GMAIL_PASSKEY` authenticate the sender; `CLIENT_EMAIL` receives submissions. The form reports an unavailable state until all three are configured. Set `NEXT_PUBLIC_APP_URL` to the deployed site origin for canonical Open Graph URLs when hosting outside Vercel.

## Production

Deploy on Vercel or run `pnpm build` followed by `pnpm start`. Set the same three environment variables in the deployment settings to enable email delivery.
