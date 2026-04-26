# 🚀 Portfolio Builder (MERN Stack)

![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/stack-MERN-blue)
![Status](https://img.shields.io/badge/status-Active-success)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

A modern **full-stack portfolio builder platform** that allows users to create, customize, and publish professional portfolio websites with real-time preview — along with a powerful admin dashboard.

---

## ✨ Overview

This project is designed to simplify portfolio creation for developers and students by providing:

* ⚡ Instant portfolio generation
* 🎨 Custom templates & themes
* 🌍 Public shareable links
* 🛠️ Admin control panel
* 📊 Analytics & management tools

---

## 🔥 Features

### 👤 User Features

* 🧑 Create & manage portfolio
* 🖼️ Upload profile image
* 🎯 Add:

  * Skills (with icons)
  * Internships (Done/Ongoing)
  * Education
  * Certificates
  * Projects
* 🎨 Template system (Glass / Minimal)
* 🌙 Dark / Light mode
* ⚡ Live preview (real-time)
* 🌍 Publish portfolio
* 🔗 Share public link

---

### 🛠️ Admin Features

* 👥 View all users
* 🚫 Ban / Suspend / Activate users
* 🗑️ Delete users
* 👁️ View user portfolios
* ✏️ Edit user portfolios
* 📊 Dashboard with stats (charts)
* 💎 Glass UI (modern design)

---

### 🌐 Public Portfolio

* Route: `/p/:id`
* Responsive & clean UI
* Shareable portfolio link

---

### 🤖 Upcoming Feature

* AI Resume Builder (Coming Soon 🚀)

---

## 🧱 Tech Stack

### Frontend

* React.js
* Vite
* CSS (Glass UI)
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📁 Project Structure

```bash
portfolio-builder/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Builder.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   ├── api.js
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── portfolio.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Portfolio.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/portfolio-builder.git
cd portfolio-builder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### 🔐 Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### 📂 Portfolio

* `GET /api/portfolio/me`
* `POST /api/portfolio`
* `PUT /api/portfolio/publish`
* `GET /api/portfolio/public/:id`

### 🛠️ Admin

* `GET /api/admin/users`
* `PUT /api/admin/user/:id/status`
* `DELETE /api/admin/user/:id`
* `GET /api/admin/portfolio/:id`
* `PUT /api/admin/portfolio/:id`

---

## 🔐 Authentication

* JWT-based authentication
* Role-based access control:

  * `user`
  * `admin`

---

## 📸 Screenshots

> Add screenshots here

Example:

* Builder Page
* Admin Dashboard
* Public Portfolio

---

## 🚀 Deployment

| Service  | Platform         |
| -------- | ---------------- |
| Frontend | Vercel / Netlify |
| Backend  | Render / Railway |
| Database | MongoDB Atlas    |

---

## 🧠 Future Improvements

* 🤖 AI Resume Generator
* 🧩 Drag & Drop Builder
* 🎨 More Templates
* 📈 Portfolio Analytics
* 🔍 SEO Optimization

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork repo
# Create new branch
git checkout -b feature-name

# Commit changes
git commit -m "Added new feature"

# Push
git push origin feature-name
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by "Jibak301 & Puja403"

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
