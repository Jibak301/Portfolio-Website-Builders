import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      const data = await api("/auth/signup", "POST", form);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/builder");
      } else {
        alert(data.msg || "Signup successful");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }

        /* BACKGROUND */
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #1e293b, #020617);
        }

        /* CARD (MEDIUM SIZE FIXED) */
        .card {
          width: 100%;
          max-width: 380px;
          padding: 30px;
          border-radius: 16px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(15px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h2 {
          text-align: center;
          color: white;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border-radius: 8px;
          border: none;
          outline: none;
          font-size: 14px;
        }

        input:focus {
          box-shadow: 0 0 0 2px #6366f1;
        }

        button {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(99,102,241,0.4);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .link {
          margin-top: 14px;
          text-align: center;
          color: #38bdf8;
          cursor: pointer;
        }

        .link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="container">
        <form className="card" onSubmit={handleSubmit}>
          <h2>Create Account 🚀</h2>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <div className="link" onClick={() => navigate("/")}>
            Already have an account? Login
          </div>
        </form>
      </div>
    </>
  );
}
