export default function Sidebar({ role }) {
  return (
    <div className="sidebar">
      <h2>{role.toUpperCase()}</h2>

      <a href={role === "admin" ? "/admin" : "/client"}>Dashboard</a>

      {role === "client" && <a href="/builder">Builder</a>}

      <a href="/">Logout</a>
    </div>
  );
}
