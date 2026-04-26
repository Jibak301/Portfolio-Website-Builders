import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const data = await api("/auth/login", "POST", form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/builder");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <>
      {/* ===== CSS INSIDE SAME FILE ===== */}
      <style>{`
        body {
          margin: 0;
          font-family: sans-serif;
        }

        /* BACKGROUND */
        .app-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(-45deg,#020617,#0f172a,#1e293b,#020617);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
          position: relative;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* FLOATING BLOBS */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .b1 {
          width: 300px;
          height: 300px;
          background: #6366f1;
          top: 10%;
          left: 10%;
          animation: float 6s infinite alternate;
        }

        .b2 {
          width: 250px;
          height: 250px;
          background: #22c55e;
          bottom: 10%;
          right: 10%;
          animation: float 8s infinite alternate;
        }

        @keyframes float {
          from { transform: translateY(0); }
          to { transform: translateY(-40px); }
        }

        /* GLASS CARD */
        .auth-box {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          padding: 25px;
          border-radius: 12px;
          width: 320px;
          animation: fadeIn 0.8s ease;
          z-index: 1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h1 {
          text-align: center;
        }

        input {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border-radius: 6px;
          border: none;
        }

        button {
          width: 100%;
          margin-top: 15px;
          padding: 10px;
          border: none;
          border-radius: 6px;
          background: #6366f1;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          transform: scale(1.05);
        }

        .auth-links {
          margin-top: 10px;
          text-align: center;
        }

        .auth-links p {
          cursor: pointer;
          color: #38bdf8;
        }
      `}</style>

      <div className="app-bg">
        {/* BLOBS */}
        <div className="blob b1"></div>
        <div className="blob b2"></div>

        {/* LOGIN BOX */}
        <div className="auth-box">
          <h1>Login 🚀</h1>

          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button onClick={login}>Login</button>

          <div className="auth-links">
            <p onClick={() => navigate("/signup")}>👉 Create Account</p>

            <p onClick={() => navigate("/admin-login")}>👉 Admin Login</p>
          </div>
        </div>
      </div>
    </>
  );
}
