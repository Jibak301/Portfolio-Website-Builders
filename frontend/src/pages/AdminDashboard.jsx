import { useEffect, useState } from "react";
import { api } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({});
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // LOAD USERS
  const loadUsers = async () => {
    setLoading(true);
    const res = await api("/admin/users");
    setUsers(res);
    setFilteredUsers(res);
    setLoading(false);
  };

  const loadStats = async () => {
    const res = await api("/admin/stats");
    setStats(res);
  };

  // ACTIONS
  const deleteUser = async (id) => {
    if (!window.confirm("Delete?")) return;
    await api(`/admin/user/${id}`, "DELETE");
    loadUsers();
    loadStats();
  };

  const updateStatus = async (id, status) => {
    await api(`/admin/user/${id}/status`, "PUT", { status });
    loadUsers();
    loadStats();
  };

  // 🔥 FIXED VIEW / EDIT
  const viewPortfolio = async (id, edit = false) => {
    const res = await api(`/admin/portfolio/${id}`);
    setSelectedPortfolio(res);
    setEditMode(edit);
  };

  // SAVE EDIT
  const savePortfolio = async () => {
    await api(
      `/admin/portfolio/${selectedPortfolio.user}`,
      "PUT",
      selectedPortfolio
    );
    alert("Saved!");
    setEditMode(false);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin-login";
  };

  // MODE
  const toggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // FILTER
  useEffect(() => {
    let data = [...users];
    if (search) {
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredUsers(data);
  }, [search, users]);

  useEffect(() => {
    loadUsers();
    loadStats();
  }, []);

  const chartData = [
    { name: "Total", value: stats.total || 0 },
    { name: "Active", value: stats.active || 0 },
    { name: "Banned", value: stats.banned || 0 },
    { name: "Suspended", value: stats.suspended || 0 },
  ];

  return (
    <div className={darkMode ? "dark bg" : "bg"}>
      <style>{`
        .bg {
          min-height:100vh;
          padding:30px;
          background:linear-gradient(135deg,#020617,#0f172a,#1e293b);
          color:white;
        }

        .dark {
          background:linear-gradient(135deg,#020617,#020617,#020617);
        }

        .glass {
          background:rgba(255,255,255,0.08);
          backdrop-filter:blur(12px);
          padding:20px;
          border-radius:12px;
          margin-bottom:20px;
        }

        table { width:100%; }
        td, th { padding:10px; }

        .btn {
          padding:6px 12px;
          border:none;
          border-radius:8px;
          margin:3px;
          cursor:pointer;
          color:white;
          transition:0.3s;
        }

        .btn:hover { transform:scale(1.1); }

        .view { background:#3b82f6; }
        .edit { background:#9333ea; }
        .active { background:#22c55e; }
        .suspend { background:#facc15; color:black;}
        .ban { background:#ef4444; }
        .delete { background:#64748b; }
      `}</style>

      <h1>🚀 Admin Dashboard</h1>

      {/* TOP BAR */}
      <div className="glass">
        <button className="btn view" onClick={toggleMode}>
          {darkMode ? "🌙 Dark" : "☀ Light"}
        </button>

        <button className="btn delete" onClick={logout}>
          Logout
        </button>
      </div>

      {/* CHART */}
      <div className="glass">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff"/>
            <YAxis stroke="#fff"/>
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SEARCH */}
      <div className="glass">
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS */}
      <div className="glass">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.status}</td>

                  <td>
                    <button className="btn view" onClick={() => viewPortfolio(u._id, false)}>View</button>

                    <button className="btn edit" onClick={() => viewPortfolio(u._id, true)}>Edit</button>

                    <button className="btn active" onClick={() => updateStatus(u._id,"active")}>Activate</button>

                    <button className="btn suspend" onClick={() => updateStatus(u._id,"suspended")}>Suspend</button>

                    <button className="btn ban" onClick={() => updateStatus(u._id,"banned")}>Ban</button>

                    <button className="btn delete" onClick={() => deleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PORTFOLIO */}
      {selectedPortfolio && (
        <div className="glass">
          {editMode ? (
            <>
              <input
                value={selectedPortfolio?.name || ""}
                onChange={(e) =>
                  setSelectedPortfolio({
                    ...selectedPortfolio,
                    name: e.target.value,
                  })
                }
              />

              <textarea
                value={selectedPortfolio?.bio || ""}
                onChange={(e) =>
                  setSelectedPortfolio({
                    ...selectedPortfolio,
                    bio: e.target.value,
                  })
                }
              />

              <button className="btn active" onClick={savePortfolio}>
                Save
              </button>
            </>
          ) : (
            <>
              <h2>{selectedPortfolio.name}</h2>
              <p>{selectedPortfolio.bio}</p>
            </>
          )}

          <button
            className="btn delete"
            onClick={() => setSelectedPortfolio(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}