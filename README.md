# Physics Path

A structured roadmap web app for high school students moving from AP Physics
into F=ma and USAPhO competition preparation.

This README assumes you've never deployed a website before. Follow it top to
bottom and you'll have a live site with a working database and login system.

---

## What's in this project

- **Next.js 14** (App Router) + **TypeScript** — the framework and language
- **Tailwind CSS** + **shadcn/ui-style components** — styling
- **Supabase** — the database (PostgreSQL) and login system (magic-link email)
- **Vercel** — where the live site will be hosted, for free

The app works for anyone without an account — progress is saved in the
browser. Signing in (just an email, no password) saves progress to a real
database instead, so it follows you across devices.

---

## Part 1 — Get the code running on your own computer

### 1. Install Node.js

Download and install the "LTS" version from [nodejs.org](https://nodejs.org).
This gives you `node` and `npm`, which you'll use to run the project.

### 2. Open this folder in a terminal

If you're using VS Code: open the `physics-path` folder, then open a
terminal with `Terminal > New Terminal` in the top menu.

### 3. Install the project's dependencies

```bash
npm install
```

This reads `package.json` and downloads every library the project needs
into a `node_modules` folder. It can take a minute or two.

### 4. Set up Supabase (the database)

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **New project**. Pick any name and password (save the password
   somewhere — you probably won't need it again, but keep it safe).
3. Once the project finishes setting up (about 2 minutes), go to
   **Project Settings → API** in the left sidebar.
4. You'll see a **Project URL** and an **anon public** key. You'll need both
   in the next step.
5. In the left sidebar, click **SQL Editor**, then **New query**.
6. Open the file `supabase/migrations/0001_init.sql` from this project,
   copy its entire contents, paste them into the SQL editor, and click
   **Run**. This creates all the tables the app needs.

### 5. Add your Supabase keys to the project

In the `physics-path` folder, copy `.env.example` to a new file named
`.env.local`, and fill in the two values you copied from Supabase:

```bash
cp .env.example .env.local
```

Then open `.env.local` and paste in your real URL and key.

### 6. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. That's
the whole app, running on your computer.

---

## Part 2 — Put the site on the internet

### 1. Create a GitHub account and repository

1. Sign up at [github.com](https://github.com) if you don't have an account.
2. Click the **+** icon top right → **New repository**. Name it
   `physics-path`, leave it public or private, and click **Create repository**.
3. Follow GitHub's instructions under "…or push an existing repository from
   the command line" — it'll look like this (run from the `physics-path`
   folder):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/physics-path.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Sign up at [vercel.com](https://vercel.com) using your GitHub account —
   this lets Vercel see your repositories.
2. Click **Add New → Project**, and select your `physics-path` repository.
3. Vercel will detect it's a Next.js app automatically. Before clicking
   Deploy, expand **Environment Variables** and add the same two values
   from your `.env.local` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. After a minute or two, you'll get a live URL like
   `physics-path.vercel.app` — that's your site, live on the internet.

### 3. Let Supabase know about your live URL (for the login emails to work)

1. Back in Supabase, go to **Authentication → URL Configuration**.
2. Set **Site URL** to your Vercel URL (e.g. `https://physics-path.vercel.app`).
3. Under **Redirect URLs**, add `https://physics-path.vercel.app/auth/callback`.

That's it — magic-link sign-in emails will now correctly send people back to
your live site.

---

## Project structure, if you want to make changes

```
src/
  app/                    Every page and route lives here (Next.js App Router)
    page.tsx              Landing page (/)
    roadmap/page.tsx       Roadmap page (/roadmap)
    resources/page.tsx     Resource library (/resources)
    topics/page.tsx        Topics grid (/topics)
    topics/[slug]/page.tsx Individual topic page (/topics/kinematics, etc.)
    dashboard/page.tsx     Progress dashboard (/dashboard)
    login/page.tsx         Sign-in page (/login)
    auth/callback/route.ts Handles the magic-link redirect
  components/
    ui/                   Small reusable pieces (Button, Card, Checkbox...)
    layout/               Header, theme toggle
    topics/                One-off component for the topic detail page
  lib/
    data/                 ALL THE PHYSICS CONTENT LIVES HERE
      topics.ts            The 14 topics — edit this to change topic content
      resources.ts          The resource library — edit this to add resources
      phases.ts             The 3 roadmap phases
    supabase/              Database connection setup — shouldn't need to touch
    hooks/
      use-progress.ts      Handles saving progress, for both guests and signed-in users
  types/                  TypeScript type definitions
supabase/
  migrations/0001_init.sql The database schema — run once in Supabase's SQL editor
```

### To add a new topic

1. Open `src/lib/data/topics.ts` and add a new object to the `topics` array,
   following the pattern of the existing ones.
2. Open `src/lib/data/phases.ts` and add that topic's `id` to the right
   phase's `topicIds` array.

### To add a new resource

Open `src/lib/data/resources.ts` and add a new object to the `resources`
array. If you want a topic to recommend it, add its `id` to that topic's
`recommendedResourceIds` in `topics.ts`.

No database changes are needed for either of these — content lives in code,
only *your progress* lives in the database.

---

## Troubleshooting

- **"Module not found" errors when running `npm run dev`** — run `npm install`
  again, then restart the dev server.
- **Sign-in emails never arrive** — check your spam folder first. Supabase's
  free tier has a low email-sending limit; for a real launch, connect a
  custom email provider under Authentication → Settings.
- **Dashboard shows nothing after signing in** — double check you ran the
  SQL from `supabase/migrations/0001_init.sql` in the Supabase SQL Editor.
