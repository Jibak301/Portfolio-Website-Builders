import { useEffect, useState } from "react";
import "../style.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="profile">
      <h1>👤 Profile</h1>

      <div className="card">
        <p>
          <b>Name:</b> {user.name}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Role:</b> {user.role}
        </p>
      </div>
    </div>
  );
}
