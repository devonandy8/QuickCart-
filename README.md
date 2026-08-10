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

1. Push to `main` on GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source:** Deploy from a branch.
3. Choose branch **`gh-pages`** and folder **`/ (root)`**, then Save.
4. Optional secrets (for auth + cart): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
5. After the workflow runs, the site is live at `https://devonandy8.github.io/QuickCart-/`.

## Deploy to Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy. Vercel uses `vercel.json` automatically.

## Portfolio

Listed on the [BePro creative agency](https://github.com/devonandy8/creative-agency) templates page once a live URL is configured.
