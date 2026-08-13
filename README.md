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

### Enable hosting (one-time — required)

The build is already on the **`gh-pages`** branch. You only need to turn Pages on:

1. Open **[github.com/devonandy8/QuickCart-/settings/pages](https://github.com/devonandy8/QuickCart-/settings/pages)**
2. **Build and deployment → Source:** `Deploy from a branch`
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` · **Save**

Within 1–2 minutes the site is live at **https://devonandy8.github.io/QuickCart-/**

Future pushes to `main` rebuild and update `gh-pages` automatically.

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
