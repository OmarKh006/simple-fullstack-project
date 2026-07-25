# 🛒 Product Store — MERN Stack CRUD App

A full-stack **product management application** built with the MERN-style stack (MongoDB, Express, React, Node.js). Users can view, add, edit, and delete products through a clean, responsive UI with light/dark mode support.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Data Model](#-data-model)
- [Deployment](#-deployment)

---

## 🛠 Tech Stack

**Backend**

- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv) for environment configuration
- [nodemon](https://www.npmjs.com/package/nodemon) for local dev auto-reload

**Frontend**

- [React 19](https://react.dev/) (via [Vite](https://vitejs.dev/))
- [Chakra UI v3](https://www.chakra-ui.com/) for components & theming (light/dark mode)
- [Zustand](https://github.com/pmndrs/zustand) for global state management
- [React Router v7](https://reactrouter.com/) for client-side routing
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 📁 Project Structure

```
simple-fullstack-project/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── controllers/
│   │   └── product.controller.js  # CRUD logic for products
│   ├── models/
│   │   └── product.model.js       # Mongoose Product schema
│   ├── routes/
│   │   └── product.route.js       # /api/products routes
│   └── index.js                   # Express app entry point
│
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── assets/                # Images, icons
│   │   ├── components/
│   │   │   ├── NavBar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ui/                # Chakra UI helpers (color-mode, toaster, provider, tooltip)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx       # Lists all products
│   │   │   └── CreatePage.jsx     # Form to add a new product
│   │   ├── store/
│   │   │   └── product.js         # Zustand store (API calls + state)
│   │   ├── App.jsx                # Root component & routes
│   │   └── main.jsx                # React entry point
│   ├── index.html
│   ├── vite.config.js              # Dev proxy: /api → localhost:5000
│   └── package.json
│
├── package.json                    # Root scripts (runs backend, builds frontend)
└── .gitignore
```

---

## ✨ Features

- 📦 **View products** — responsive grid layout of all products
- ➕ **Create products** — add new products with name, price, and image URL
- ✏️ **Edit products** — inline modal dialog to update product details
- 🗑️ **Delete products** — remove products with one click
- 🌗 **Light/Dark mode** toggle
- 🔔 **Toast notifications** for success/error feedback
- ⚡ **Single-server production build** — Express serves the built React app

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm
- A MongoDB database — either:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended, free tier available), or
  - a local MongoDB instance

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd simple-fullstack-project
```

### 2. Install dependencies

Install backend dependencies (root) and frontend dependencies:

```bash
npm install
npm install --prefix frontend
```

### 3. Configure environment variables

Create a `.env` file in the project root (see [Environment Variables](#-environment-variables) below).

### 4. Run in development mode

Two servers run separately in development — backend (API) and frontend (Vite dev server with hot reload).

**Terminal 1 — Backend:**

```bash
npm run dev
```

Runs on `http://localhost:5000`

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

Runs on `http://localhost:5173` (Vite proxies `/api` requests to the backend automatically)

### 5. Open the app

Visit **http://localhost:5173** in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the **project root** with:

| Variable      | Description                            | Example                                              |
| ------------- | -------------------------------------- | ---------------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string              | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `PORT`        | Port for the Express server (optional) | `5000`                                               |
| `NODE_ENV`    | Environment mode                       | `development` or `production`                        |

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

> ⚠️ `.env` is already listed in `.gitignore` — never commit real credentials.

---

## 📜 Available Scripts

**Root (`package.json`)**

| Command         | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `npm run dev`   | Starts the backend with nodemon (auto-restart on changes)         |
| `npm run build` | Installs all dependencies and builds the frontend for production  |
| `npm start`     | Starts the backend in production mode (serves built frontend too) |

**Frontend (`frontend/package.json`)**

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the Vite dev server            |
| `npm run build`   | Builds the frontend for production    |
| `npm run preview` | Previews the production build locally |
| `npm run lint`    | Runs ESLint                           |

---

## 🔌 API Reference

Base URL: `/api/products`

| Method   | Endpoint            | Description                | Body                                        |
| -------- | ------------------- | -------------------------- | ------------------------------------------- |
| `GET`    | `/api/products`     | Get all products           | —                                           |
| `POST`   | `/api/products`     | Create a new product       | `{ "name", "price", "image" }`              |
| `PUT`    | `/api/products/:id` | Update an existing product | `{ "name", "price", "image" }` (any subset) |
| `DELETE` | `/api/products/:id` | Delete a product           | —                                           |

**Response shape:**

```json
{
  "success": true,
  "data": { ... }
}
```

or on failure:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🗄 Data Model

**Product** (`backend/models/product.model.js`)

| Field       | Type   | Required | Notes                      |
| ----------- | ------ | -------- | -------------------------- |
| `name`      | String | ✅       | Product name               |
| `price`     | Number | ✅       | Product price              |
| `image`     | String | ✅       | Image URL                  |
| `createdAt` | Date   | auto     | Set by Mongoose timestamps |
| `updatedAt` | Date   | auto     | Set by Mongoose timestamps |

---

## 🌐 Deployment

The app is set up to be deployed as a **single server**: Express serves the built React app when `NODE_ENV=production`.

1. Set environment variables on your hosting platform (`MONGODB_URI`, `NODE_ENV=production`, `PORT`).
2. Build the app:
   ```bash
   npm run build
   ```
   This installs dependencies and builds the frontend into `frontend/dist`.
3. Start the server:
   ```bash
   npm start
   ```
4. Express will serve the React app for all non-API routes, and handle `/api/products` requests.

Works well on platforms like **Render**, **Railway**, or any Node-compatible host, paired with **MongoDB Atlas**.

---

## 📄 License

ISC
