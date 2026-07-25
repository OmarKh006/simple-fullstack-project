# 🛒 Product Store

A full-stack CRUD application for managing a product catalog — built with **React (Vite)**, **Chakra UI v3**, **Express**, and **MongoDB**. Users can create, view, update, and delete products, with a live-updating grid, dark/light mode, and toast notifications.

---

## ✨ Features

- 📦 Create, read, update, and delete products
- 🌗 Light / dark mode toggle
- ⚡ Instant UI updates via [Zustand](https://github.com/pmndrs/zustand) state management (no full refetch after mutations)
- 🔔 Toast notifications for success/error feedback
- 📱 Responsive grid layout (1 / 2 / 3 columns based on screen size)
- 🖼️ Product cards with image, name, price, edit, and delete actions

---

## 🧰 Tech Stack

**Frontend**

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Chakra UI v3](https://chakra-ui.com/) for components and styling
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [React Router v7](https://reactrouter.com/) for client-side routing
- [react-icons](https://react-icons.github.io/react-icons/)

**Backend**

- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv) for environment configuration

---

## 📁 Project Structure

```
simple-fullstack-project/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── product.controller.js  # Route handlers (CRUD logic)
│   ├── models/
│   │   └── product.model.js       # Mongoose schema
│   ├── routes/
│   │   └── product.route.js       # /api/products routes
│   └── index.js                   # Express app entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ui/                 # Chakra snippet components (color-mode, toaster, provider)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── CreatePage.jsx
│   │   ├── store/
│   │   │   └── product.js          # Zustand store (createProduct, getAllProducts, updateProduct, deleteProduct)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── package.json                    # Root scripts (dev/build/start)
└── vercel.json                     # Deployment config
```

---

## 🔌 API Reference

Base URL: `/api/products`

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/products`     | Get all products           |
| POST   | `/api/products`     | Create a new product       |
| PUT    | `/api/products/:id` | Update an existing product |
| DELETE | `/api/products/:id` | Delete a product           |

**Product schema**

```json
{
  "name": "String (required)",
  "price": "Number (required)",
  "image": "String (required)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

All responses follow this shape:

```json
{ "success": true, "data": { ... } }
```

or on error:

```json
{ "success": false, "message": "..." }
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd simple-fullstack-project
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

> ⚠️ The variable **must** be named `MONGODB_URI` — this is what `backend/config/db.js` reads.

### 3. Install dependencies

```bash
npm install
npm install --prefix frontend
```

### 4. Run in development

This starts the backend with hot-reload (Nodemon). The Vite dev server proxies `/api` requests to `http://localhost:5000` (see `frontend/vite.config.js`), so run both:

```bash
# terminal 1 — backend (http://localhost:5000)
npm run dev

# terminal 2 — frontend (http://localhost:5173)
npm run dev --prefix frontend
```

### 5. Build for production

```bash
npm run build
```

This installs all dependencies and builds the frontend into `frontend/dist`.

### 6. Start in production

```bash
npm start
```

Express will serve the built frontend from `frontend/dist` and handle API routes from the same server.

---

## 📜 Available Scripts

**Root `package.json`**
| Script | Description |
|--------|-------------|
| `npm run dev` | Runs the backend with Nodemon (development) |
| `npm run build` | Installs all deps and builds the frontend |
| `npm start` | Runs the backend in production mode, serving the built frontend |

**`frontend/package.json`**
| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Builds the frontend for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint |

---

## ☁️ Deployment (Vercel)

This project deploys as a single Vercel project using `vercel.json` at the root, which builds the Express backend as a serverless function and the Vite frontend as a static build:

```json
{
  "builds": [
    { "src": "backend/index.js", "use": "@vercel/node" },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [{ "src": "/(.*)", "dest": "backend/index.js" }]
}
```

**Required environment variable in Vercel:**

- Go to **Project → Settings → Environment Variables** and add `MONGODB_URI` with your connection string.

---

## 🗺️ Roadmap / Possible Improvements

- [ ] Add product search / filtering
- [ ] Add pagination
- [ ] Add image upload instead of URL input
- [ ] Add authentication for product management
- [ ] Add form validation with error messages

---

## 📄 License

ISC
