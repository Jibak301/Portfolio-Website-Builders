import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Portfolio Builder</h2>

      <div>
        {role === "user" && (
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        )}
        {role === "admin" && (
          <button onClick={() => navigate("/admin")}>Admin</button>
        )}

        <button onClick={() => navigate("/builder")}>Builder</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
