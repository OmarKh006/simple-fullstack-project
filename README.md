# Product Store 🛒

A full-stack **MERN**-style CRUD application for managing a simple product catalog. Users can create, view, edit, and delete products (name, price, and image URL) through a clean, responsive UI built with Chakra UI, backed by an Express/Mongoose REST API.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone / Extract the Project](#1-clone--extract-the-project)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Reference](#api-reference)
- [Frontend Routes](#frontend-routes)
- [State Management](#state-management)
- [Scripts Reference](#scripts-reference)
- [Notes & Recommendations](#notes--recommendations)

## Tech Stack

**Backend**

- [Node.js](https://nodejs.org/) (ESM — `"type": "module"`)
- [Express 5](https://expressjs.com/)
- [Mongoose 9](https://mongoosejs.com/) (MongoDB ODM)
- [dotenv](https://www.npmjs.com/package/dotenv) for environment configuration
- [nodemon](https://www.npmjs.com/package/nodemon) for local dev auto-reload

**Frontend**

- [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- [Chakra UI 3](https://chakra-ui.com/) + [Emotion](https://emotion.sh/) for styling
- [React Router 7](https://reactrouter.com/) for client-side routing
- [Zustand 5](https://zustand-demo.pmnd.rs/) for global state management
- [react-icons](https://react-icons.github.io/react-icons/) for iconography
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode

## Project Structure

```
.
│   ├── backend/
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection logic
│   │   ├── controllers/
│   │   │   └── product.controller.js # CRUD business logic
│   │   ├── models/
│   │   │   └── product.model.js      # Mongoose Product schema
│   │   ├── routes/
│   │   │   └── product.route.js      # /api/products route definitions
│   │   └── index.js                  # Express app entry point
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── src/
    │   ├── assets/                   # Static images (hero.png, logos)
    │   ├── components/
    │   │   ├── NavBar.jsx             # Top navigation + theme toggle
    │   │   ├── ProductCard.jsx        # Product display/edit/delete card
    │   │   └── ui/                    # Chakra UI primitives (toaster, color-mode, provider, tooltip)
    │   ├── pages/
    │   │   ├── HomePage.jsx           # Product grid / listing view
    │   │   └── CreatePage.jsx         # New product form
    │   ├── store/
    │   │   └── product.js             # Zustand store (API calls + state)
    │   ├── App.jsx                    # Root component & route definitions
    │   └── main.jsx                   # React root render + providers
    ├── index.html
    ├── vite.config.js                 # Dev server + /api proxy + "@" alias
    ├── package.json
    └── package-lock.json
```

> **Note:** The backend zip contains a nested `backend/backend/` directory (i.e., the `index.js` entry point lives at `backend/backend/index.js`). The `dev` script in `backend/package.json` already accounts for this (`nodemon ./backend/index.js`), so no changes are needed to run it as-is — just be aware of the nesting if you reorganize the project.

## Features

- 📋 View all products in a responsive grid (1 / 2 / 3 columns depending on screen size)
- ➕ Create a new product (name, price, image URL)
- ✏️ Edit an existing product inline via a modal dialog
- 🗑️ Delete a product
- 🌗 Light/dark mode toggle
- 🔔 Toast notifications for success/error feedback
- 🛰️ REST API with JSON responses and basic validation

## Prerequisites

- **Node.js** v18+ (recommended, for compatibility with Express 5 / Vite 8)
- **npm** (comes with Node.js)
- **MongoDB** — either:
  - A local MongoDB instance, or
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended for quick setup)

## Getting Started

### 1. Clone / Extract the Project

Make sure you have both the `backend/` and `frontend/` folders side by side in your project root.

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (see [Environment Variables](#environment-variables) below).

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Environment Variables

The backend expects a `.env` file at `backend/.env` with the following variables:

| Variable      | Description                                                | Example                                                     |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string                                  | `mongodb+srv://user:pass@cluster.mongodb.net/product-store` |
| `PORT`        | Port for the Express server (optional, defaults to `5000`) | `5000`                                                      |

Example `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/product-store?retryWrites=true&w=majority
PORT=5000
```

> ⚠️ No `.env` file was included in the project archive — you must create one yourself before starting the backend, or `connectDB()` will fail and the process will exit.

The frontend does **not** require a `.env` file for local development — the Vite dev server proxies any request to `/api` through to `http://localhost:5000` (configured in `vite.config.js`).

## Running the App

You'll need two terminal windows/tabs — one for the backend, one for the frontend.

**Terminal 1 — Backend** (runs on `http://localhost:5000`):

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend** (runs on `http://localhost:5173` by default):

```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser. API calls made from the frontend to `/api/...` are automatically proxied to the backend.

### Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

This outputs static assets to `frontend/dist/`, which can be served by any static host or wired up to be served directly by the Express backend (not currently configured — the backend only exposes the `/api/products` routes and a placeholder `/` route).

## API Reference

Base URL: `http://localhost:5000/api/products`

| Method | Endpoint            | Description                | Body (JSON)                                                         |
| ------ | ------------------- | -------------------------- | ------------------------------------------------------------------- |
| GET    | `/api/products`     | Fetch all products         | —                                                                   |
| POST   | `/api/products`     | Create a new product       | `{ "name": string, "price": number, "image": string }`              |
| PUT    | `/api/products/:id` | Update an existing product | `{ "name": string, "price": number, "image": string }` (any subset) |
| DELETE | `/api/products/:id` | Delete a product           | —                                                                   |

**Example responses** all follow this shape:

```json
{
  "success": true,
  "data": {
    /* product object */
  }
}
```

```json
{ "success": false, "message": "Provide all the fields" }
```

**Product schema** (`backend/backend/models/product.model.js`):

```js
{
  name: String,      // required
  price: Number,      // required
  image: String,       // required
  createdAt: Date,      // auto (timestamps)
  updatedAt: Date        // auto (timestamps)
}
```

## Frontend Routes

| Path      | Component    | Description                     |
| --------- | ------------ | ------------------------------- |
| `/`       | `HomePage`   | Displays all products in a grid |
| `/create` | `CreatePage` | Form to add a new product       |

## State Management

The `useProductStore` Zustand store (`frontend/src/store/product.js`) centralizes all product state and API interactions:

- `products` — array of products currently loaded
- `setProducts(products)` — manually set product list
- `getAllProducts()` — fetches all products from the API
- `createProduct(newProduct)` — validates fields client-side, then POSTs a new product
- `updateProduct(id, updatedProduct)` — PUTs updates for a product
- `deleteProduct(id)` — DELETEs a product and removes it from local state

## Scripts Reference

**Backend** (`backend/package.json`):
| Script | Command | Description |
|--------------|-------------------------------|-------------------------------------|
| `npm run dev`| `nodemon ./backend/index.js` | Start backend with auto-reload |

**Frontend** (`frontend/package.json`):
| Script | Command | Description |
|-----------------|-------------------|----------------------------------------|
| `npm run dev` | `vite` | Start Vite dev server |
| `npm run build` | `vite build` | Build for production |
| `npm run lint` | `eslint .` | Run ESLint over the project |
| `npm run preview`| `vite preview` | Preview the production build locally |

## Notes & Recommendations

- **No `start` script**: the backend `package.json` only defines `dev` (using `nodemon`). For a production deployment, add a plain `"start": "node ./backend/index.js"` script so you're not relying on `nodemon` in production.
- **Nested backend folder**: consider flattening `backend/backend/*` up one level to `backend/*` for a cleaner structure, then updating the `dev`/`start` scripts accordingly.
- **CORS**: no CORS middleware is currently configured on the Express server. This works today because Vite's dev proxy makes frontend requests appear same-origin, but if you deploy the frontend and backend separately (different domains/ports) in production, you'll need to add the [`cors`](https://www.npmjs.com/package/cors) package.
- **Validation**: server-side validation is minimal (only checks required fields are present on create). Consider adding stricter validation (e.g., positive price, valid URL for image) via Mongoose validators or a library like `zod`/`joi`.
- **Static asset serving**: if you want a single deployable service, you can have Express serve `frontend/dist` in production and fall back to `index.html` for client-side routing.
