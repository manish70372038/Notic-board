# Notice Board

A full-stack Notice Board application with Create, Read, Update, and Delete (CRUD) functionality, built for the Reno Platforms Web Development Internship assignment.

**Live Demo:** [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **Database ORM:** Prisma
- **Database:** Neon (PostgreSQL, free tier)
- **Hosting:** Vercel (Hobby tier)
- **Styling:** Tailwind CSS

---

## Features

- ✅ List all notices as responsive cards (mobile & desktop)
- ✅ Create new notices via a shared form
- ✅ Edit existing notices (form pre-fills with current values)
- ✅ Delete with confirmation step
- ✅ Urgent notices sorted first (via Prisma `orderBy`), with a red badge
- ✅ Server-side validation (required fields, valid date)
- ✅ Category and Priority badges on each card
- ✅ Optional image URL support (bonus)

---

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/notice-board.git
cd notice-board
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your Neon database connection string:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```
Get a free database at [neon.tech](https://neon.tech).

### 4. Push the Prisma schema to the database
```bash
npx prisma db push
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

1. Push this repository to GitHub (make sure it's **public**).
2. Import the project in [vercel.com](https://vercel.com).
3. Add the environment variable `DATABASE_URL` in Vercel project settings.
4. Deploy — Vercel runs `prisma generate && next build` automatically via the `build` script.

---

## One Thing I Would Improve With More Time

**File upload for images instead of URL input.** Currently the image field accepts a URL. With more time, I would integrate Vercel Blob or Cloudinary to allow users to upload images directly, making the experience much more user-friendly and reliable.

---

## AI Usage

AI (Claude) was used for:
- Generating the initial boilerplate structure for the Next.js Pages Router project
- Suggesting the Prisma schema design
- Helping write the Tailwind CSS classes for the card and form layouts

All logic — the API route validation, the Prisma `orderBy` for urgent-first sorting, the confirmation flow for delete, and the shared form pattern for create/edit — was understood and verified by me. I can explain every part of the code.
