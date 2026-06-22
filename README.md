# BlogHub 📝

> A modern full-stack blog platform — write, read, and inspire.  
> Built with **Next.js 15**, **Redux Toolkit**, **JSON Server**, and **Cloudinary**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

- 🔐 **Auth System** — Login & Signup with JSON Server + sessionStorage
- 🔍 **Search** — Search blogs by title, category, or author
- 🏷️ **Filter** — Filter by category (Technology, Programming, React, Next.js, AI)
- 📊 **Sort** — Sort A→Z, Z→A, Newest, Oldest, or by Category
- 📄 **Pagination** — 6 blogs per page with page number controls
- ➕ **Add Blog** — Full form with Cloudinary image upload & client-side validation
- ✏️ **Edit Blog** — Dynamic route `/edit-blog/[id]`
- 🗑️ **Delete Blog** — Remove instantly with confirmation prompt
- ☁️ **Image Upload** — Cloudinary integration for blog cover images
- 🌑 **Premium Dark UI** — Purple-accented cinematic design with smooth animations

---

## 🖥️ Pages & Routes

| Route | Description |
|---|---|
| `/` | Home — blog grid with search, filter, sort & pagination |
| `/add-blog` | Add a new blog (protected route) |
| `/edit-blog/[id]` | Edit an existing blog |
| `/login` | Login page |
| `/signup` | Signup / Register page |

---

## 🗂️ Project Structure

```
my-blog/
│
├── src/
│   ├── app/
│   │   ├── layout.js                  # Root layout (Bootstrap + StoreProvider)
│   │   ├── page.js                    # Home page
│   │   ├── StoreProvider.js           # Redux Provider wrapper
│   │   ├── add-blog/
│   │   │   ├── page.js                # Add Blog page
│   │   │   └── addBlog.css
│   │   ├── edit-blog/[id]/
│   │   │   └── page.js                # Edit Blog page
│   │   ├── login/
│   │   │   ├── page.js                # Login page
│   │   │   └── login.css
│   │   └── signup/
│   │       ├── page.js                # Signup page
│   │       └── signup.css
│   │
│   ├── components/
│   │   ├── Header/                    # Navbar — logo, search, Add Blog, Logout
│   │   ├── Hero/                      # Landing hero section
│   │   ├── BlogList/                  # Blog grid with all logic
│   │   ├── Sorting/                   # Sort dropdown component
│   │   ├── Filtering/                 # Category filter buttons
│   │   └── Pagination/                # Page number controls
│   │
│   ├── redux/
│   │   ├── store.js                   # Redux store (blogStore + authStore)
│   │   ├── actions/
│   │   │   └── blogAction.js          # Async thunks — blogs + auth
│   │   └── slices/
│   │       ├── blogSlice.js           # Blog state & reducers
│   │       └── authSlice.js           # Auth state & reducers
│   │
│   ├── services/
│   │   └── uploadImage.js             # Cloudinary image upload helper
│   │
│   └── utils/
│       └── validateForm.js            # Client-side form validation
│
├── db.json                            # JSON Server database (blogs + users)
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **Next.js 15** | App Router, dynamic routes, protected pages |
| **React 19** | UI components, hooks (`useState`, `useEffect`) |
| **Redux Toolkit** | Global state — auth (login/signup/logout) |
| **JSON Server** | Mock REST API on `localhost:5000` |
| **React Bootstrap** | Navbar, buttons, layout |
| **React Icons** | `FaPenNib`, `FaSearch` |
| **Cloudinary** | Blog cover image upload & hosting |
| **Custom CSS** | Premium dark theme with purple accents |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Devarshiboghani/my-blog

# 2. Navigate into the project
cd my-blog

# 3. Install dependencies
npm install

# 4. Run both servers in separate terminals
npm run dev       # Terminal 1 — Next.js on localhost:3000
npm run server    # Terminal 2 — JSON Server on localhost:5000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Dependencies

```bash
npm install next react react-dom
npm install @reduxjs/toolkit react-redux
npm install axios
npm install react-bootstrap bootstrap
npm install react-icons
npm install json-server
```

Import Bootstrap in `src/app/layout.js`:

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

---

## 🗄️ Database Structure

`db.json` — JSON Server root file:

```json
{
  "blogs": [],
  "users": []
}
```

`package.json` script:

```json
"server": "json-server --watch db.json --port 5000"
```

---

## ☁️ Cloudinary Setup

`src/services/uploadImage.js` mein apni credentials daalo:

```js
fileData.append("cloud_name", "dg9uxwjhr");
fileData.append("upload_preset", "blog-images");
```

Cloudinary dashboard → Settings → Upload → Add unsigned upload preset.

---

## 📋 Blog Object Structure

```json
{
  "id": 1,
  "title": "Getting Started with Next.js",
  "author": "John Doe",
  "category": "Next.js",
  "description": "A short intro to Next.js App Router",
  "content": "Full blog content here...",
  "image": "https://res.cloudinary.com/your-cloud/image.jpg",
  "createdAt": "22/6/2026"
}
```

---

## 💡 Key Implementation Notes

**Auth Flow**
Login/Signup dispatches Redux actions → JSON Server `/users` se match karta hai → user `sessionStorage` mein save hota hai → protected routes check karte hain.

**Search + Filter + Sort + Pagination**
Sab kuch `BlogList.jsx` ke ek `useEffect` mein handle hota hai — pehle search, phir category filter, phir sort, aur finally pagination slice karta hai result ko.

**Protected Route**
`/add-blog` page `sessionStorage` check karta hai — agar user nahi hai toh `/login` redirect karta hai.

**Cloudinary Upload**
Image directly browser se Cloudinary pe upload hoti hai unsigned preset ke through — koi server-side code nahi chahiye.

---

## 🤝 Contributing

Pull requests welcome! Bade changes ke liye pehle issue open karo discuss karne ke liye.

---

## 📄 License

This project is open source — [MIT License](LICENSE).

---

<p align="center">Made with ❤️ using Next.js & Redux Toolkit</p>