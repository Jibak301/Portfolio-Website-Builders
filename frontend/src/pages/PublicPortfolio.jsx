import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PublicPortfolio() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    fetch(`http://localhost:5000/api/portfolio/${id}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        if (d?.mode) setMode(d.mode);
      });
  }, [id]);

  if (!data) return <h2 style={{ padding: 20 }}>Loading...</h2>;

  const isLight = mode === "light";

  return (
    <>
      <style>{`
        body { margin:0; font-family: 'Inter', sans-serif; }
        .wrap {
          min-height: 100vh;
          padding: 40px 20px;
          background: ${
            isLight
              ? "linear-gradient(135deg,#f8fafc,#e2e8f0)"
              : "radial-gradient(circle at top,#1e293b,#020617)"
          };
          color: ${isLight ? "#000" : "#fff"};
        }

        .glass {
          max-width: 800px;
          margin: auto;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border-radius: 16px;
          padding: 30px;
        }

        h1 { text-align:center; }
        img { border-radius: 50%; display:block; margin:10px auto; }

        .skill {
          display:inline-block;
          margin:5px;
          padding:6px 10px;
          border-radius:6px;
          background: linear-gradient(135deg,#6366f1,#4f46e5);
          color:white;
        }

        a { color: #38bdf8; }
      `}</style>

      <div className="wrap">
        <div className="glass">
          <h1>{data.name}</h1>

          {data.photo && (
            <img
              src={`http://localhost:5000/uploads/${data.photo}`}
              width="120"
            />
          )}

          <p style={{ textAlign: "center" }}>{data.bio}</p>

          <h3>GitHub</h3>
          <a href={data.github} target="_blank">
            {data.github}
          </a>

          <h3>Skills</h3>
          {(data.skills || []).map((s, i) => (
            <span key={i} className="skill">
              {s.icon} {s.name}
            </span>
          ))}

          <h3>Education</h3>
          {(data.education || []).map((e, i) => (
            <p key={i}>
              {e.school} - {e.degree}
            </p>
          ))}

          <h3>Certificates</h3>
          {(data.certificates || []).map((c, i) => (
            <p key={i}>{c.title}</p>
          ))}

          <h3>Internships</h3>
          {(data.internships || []).map((i, idx) => (
            <p key={idx}>
              {i.company} - {i.role} ({i.done ? "Done" : "Ongoing"})
            </p>
          ))}

          <h3>Projects</h3>
          {(data.projects || []).map((p, i) => (
            <p key={i}>{p.title}</p>
          ))}
        </div>
      </div>
    </>
  );
}
