# Notice Board

A full-stack Notice Board built for the Reno Platforms Web Development Internship assignment.

**Live Demo:** [notice-board-manish.vercel.app](https://notice-board-manish.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (Pages Router) |
| Database | Neon (PostgreSQL, free tier) |
| ORM | Prisma |
| Styling | Tailwind CSS |
| Hosting | Vercel (Hobby tier) |

---

## Features

- Create, edit, and delete notices
- Urgent notices always appear at the top with a red badge
- Server-side validation on all API routes
- Responsive layout — works on mobile and desktop
- Confirmation step before deleting a notice
- Optional image support per notice

---

## Running Locally

**1. Clone the repo**
```bash
git clone https://github.com/manish70372038/notice-board.git
cd notice-board
```

**2. Install dependencies**
```bash
npm install
```

**3. Add environment variable**

Create a `.env` file in the root: