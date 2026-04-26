import "../style.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PortfolioView() {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/portfolio/${name}`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="public">
      {data.photo && <img src={data.photo} className="avatar" />}

      <h1>{data.name}</h1>
      <p>{data.bio}</p>

      <div className="links">
        <a href={data.github}>GitHub</a>
        <a href={data.linkedin}>LinkedIn</a>
      </div>

      <h3>Projects</h3>
      {data.projects.map((p, i) => (
        <div key={i}>{p.title}</div>
      ))}

      <h3>Skills</h3>
      {data.skills.map((s, i) => (
        <span key={i}>{s.name}</span>
      ))}
    </div>
  );
}
