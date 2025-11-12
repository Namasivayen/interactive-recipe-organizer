
# Interactive Recipe Organizer

## Project Overview
A full-stack web application for organizing, sharing, and reviewing recipes. Features include user authentication, recipe management, comments, ratings, favorites, and an admin analytics dashboard.

## Tech Stack
- **Frontend:** React.js (Vite), React Router, Axios, Tailwind CSS, Chart.js
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Dev Tools:** concurrently
- **Deployment:** Render, Vercel, or Netlify

## Installation Instructions

1. **Clone the repository:**
	```sh
	git clone <repo-url>
	cd interactive-recipe-organizer
	```
2. **Install dependencies:**
	```sh
	npm install
	cd backend && npm install
	cd ../frontend && npm install
	```
3. **Configure environment variables:**
	- Edit `.env` and `.env.production` in both `backend/` and `frontend/` folders with your MongoDB URI, JWT secret, and API URLs.
4. **Run in development:**
	```sh
	npm run dev
	```
5. **Build for production:**
	```sh
	npm run build
	# Deploy backend folder to your server
	```

## Folder Structure
```
interactive-recipe-organizer/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── public/ (built frontend)
│   ├── index.js
│   └── .env / .env.production
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── api.js
│   ├── tailwind.config.js
│   ├── index.css
│   └── .env / .env.production
├── package.json
└── README.md
```

## API Endpoints Summary

### Auth
- `POST /auth/register` — Register new user
- `POST /auth/login` — Login and receive JWT
- `GET /auth/profile` — Get current user profile

### Recipes
- `POST /recipes` — Add recipe (auth required)
- `GET /recipes` — List recipes (filter by cuisine, rating, prepTime)
- `GET /recipes/:id` — Get recipe details
- `PUT /recipes/:id` — Update recipe (author only)
- `DELETE /recipes/:id` — Delete recipe (author only)
- `POST /recipes/:id/favorite` — Add/remove favorite
- `POST /recipes/:id/rate` — Add/update rating

### Comments
- `POST /recipes/:id/comments` — Add comment/reply
- `GET /recipes/:id/comments` — Get nested comments
- `POST /comments/:id/like` — Like/unlike comment

### Dashboard (Admin)
- `GET /dashboard/top-rated` — Top-rated recipes
- `GET /dashboard/active-users` — Most active users
- `GET /dashboard/popular-cuisines` — Most popular cuisines

---

> Built with ❤️ for food lovers and developers.
