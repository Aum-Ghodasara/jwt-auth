# 🔐 Full-Stack JWT Authentication Flow

A complete, two-part full-stack application demonstrating secure user authentication using JSON Web Tokens (JWT). It features a distinct Node.js/Express backend API and a modern React/Vite frontend.

This project was built to understand the complete lifecycle of authentication, including token generation, secure storage, middleware protection, and handling strict token expirations.

## ✨ Features

* **Complete Auth Flow:** User registration and login interfaces.
* **Short-Lived Tokens (TTL):** JWTs are configured with a strict 1-minute Time-To-Live (`1m`) to demonstrate real-time session expiration and security.
* **Protected Routes:** Custom Express middleware intercepts requests to verify token validity before serving secure dashboard data.
* **Secure Storage:** Tokens are stored in the browser's `sessionStorage`, ensuring they are automatically cleared when the user closes the tab.
* **CORS Management:** Configured using a Vite proxy for seamless, local cross-origin requests without complex backend CORS setups.
* **Auto-Logout:** The frontend automatically detects 401/403 HTTP errors (expired tokens) and instantly logs the user out.

## 🛠️ Tech Stack

**Frontend:**
* React (via Vite)
* JavaScript (ES6+)
* CSS3

**Backend:**
* Node.js
* Express.js
* `jsonwebtoken` (JWT implementation)

## 📂 Project Structure

The project is strictly separated into two distinct environments to prevent module conflicts:

```text
JWT-AUTH/
├── backend/                # Node.js/Express API
│   ├── package.json        
│   └── server.js           # Handles /register, /login, and /dashboard
│
└── frontend/               # React/Vite UI
    ├── public/
    ├── src/
    │   ├── App.jsx         # Main application logic & state management
    │   └── main.jsx
    ├── package.json        
    └── vite.config.js      # Configured with proxy for backend communication

🚀 How to Run Locally
Because the backend and frontend are separated, you need to run two servers simultaneously in different terminal windows.

1. Start the Backend Server
Open your first terminal and navigate to the backend folder:

cd backend
npm install
node server.js
The backend will start running on http://localhost:3000

2. Start the Frontend App
Open a second terminal and navigate to the frontend folder:

cd frontend
npm install
npm run dev
The React app will start running on http://localhost:5173

🧪 Testing the Flow
Open your browser to http://localhost:5173.

Register: Create a new user (e.g., Username: aum).

Login: Log in with those exact credentials to receive your session token.

Access Secure Data: Click "Fetch Protected Data" to verify the middleware allows your request.

Test Expiration: Wait exactly 60 seconds. Click the button again. The backend will reject the expired token, and the frontend will automatically log you out!

📝 Future Improvements (Production Notes)
Currently, this app is configured for local testing and learning. For a production environment, the following would be implemented:

Integration of bcrypt to hash and salt passwords before storing them in the database.

Migration from the in-memory array (const users = []) to a persistent database like MongoDB or PostgreSQL.

Implementation of HTTP-only cookies for token storage to prevent XSS attacks.

Addition of a Refresh Token architecture to keep users logged in smoothly without abrupt session cuts.
