# QuickCart

Modern e-commerce storefront built with React, Mantine, and Supabase.

## Live demo

- **GitHub Pages:** https://devonandy8.github.io/QuickCart-/
- **Vercel:** connect this repo at [vercel.com/new](https://vercel.com/new) for a `*.vercel.app` URL

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Set these in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Run `supabase/schema.sql` and `supabase/seed.sql` in your Supabase SQL editor.

## Deploy to GitHub Pages

The repo auto-deploys on every push to `main`.

### Enable hosting (one-time)

1. Open **[QuickCart- Pages settings](https://github.com/devonandy8/QuickCart-/settings/pages)**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Save, then open **[Actions → Deploy to GitHub Pages](https://github.com/devonandy8/QuickCart-/actions/workflows/deploy-pages.yml)** and click **Run workflow** (or push any commit to `main`)

Your site will be live at **https://devonandy8.github.io/QuickCart-/**

### Optional secrets (auth + cart)

Repo **Settings → Secrets and variables → Actions**:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Deploy to Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy. Vercel uses `vercel.json` automatically.

## Portfolio

Listed on the [BePro creative agency](https://github.com/devonandy8/creative-agency) templates page once a live URL is configured.
