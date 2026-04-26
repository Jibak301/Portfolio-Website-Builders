import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Builder() {
  const nav = useNavigate();

  const [data, setData] = useState({
    name: "",
    bio: "",
    photo: "",
    github: "",
    skills: [],
    internships: [],
    education: [],
    certificates: [],
    projects: [],
    template: "glass",
    mode: "dark",
    isPublished: false,
    _id: "",
  });

  const [skill, setSkill] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    api("/portfolio/me").then((res) => {
      if (res) {
        setData({
          ...res,
          skills: res.skills || [],
          internships: res.internships || [],
          education: res.education || [],
          certificates: res.certificates || [],
          projects: res.projects || [],
        });
      }
    });
  }, []);

  // ===== SKILLS =====
  const addSkill = () => {
    if (!skill) return;
    setData({
      ...data,
      skills: [...data.skills, { name: skill, icon }],
    });
    setSkill("");
    setIcon("");
  };

  // ===== INTERNSHIP =====
  const addInternship = () => {
    setData({
      ...data,
      internships: [
        ...data.internships,
        { company: "", role: "", done: false },
      ],
    });
  };

  // ===== EDUCATION =====
  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { school: "", degree: "" }],
    });
  };

  // ===== CERTIFICATE =====
  const addCertificate = () => {
    setData({
      ...data,
      certificates: [...data.certificates, { title: "" }],
    });
  };

  // ===== PROJECT =====
  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { title: "" }],
    });
  };

  // ===== UPLOAD =====
  const upload = async (file) => {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: form,
    });

    const d = await res.json();
    setData({ ...data, photo: d.path });
  };

  // ===== SAVE =====
  const save = async () => {
    await api("/portfolio/save", "POST", data);
    alert("Saved");
  };

  // ===== PUBLISH =====
  const togglePublish = async () => {
    const res = await api("/portfolio/publish", "PUT");
    setData({ ...data, isPublished: res.isPublished });
  };

  const copyLink = () => {
    const link = `http://localhost:5173/p/${data._id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  const isLight = data.mode === "light";

  const previewStyle = {
    background: isLight ? "#f8fafc" : "#020617",
    color: isLight ? "#000" : "#fff",
    padding: "20px",
    borderRadius: "12px",
  };

  return (
    <>
      <style>{`
        body { margin:0; font-family: 'Inter', sans-serif; }

        .topbar {
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          padding:10px;
          background:#111;
        }

        button {
          padding:6px 12px;
          border:none;
          border-radius:6px;
          background:#6366f1;
          color:white;
          cursor:pointer;
        }

        .main {
          display:flex;
          height:calc(100vh - 60px);
        }

        .left, .right {
          flex:1;
          padding:20px;
          overflow:auto;
        }

        .glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          padding:15px;
          border-radius:12px;
          margin-bottom:10px;
        }

        .minimal {
          background:#1e293b;
          padding:15px;
          border-radius:10px;
          margin-bottom:10px;
        }

        input, textarea {
          width:100%;
          padding:8px;
          margin-top:8px;
          border:none;
          border-radius:6px;
        }

        .skill {
          display:inline-block;
          background:#6366f1;
          padding:5px 10px;
          margin:5px;
          border-radius:6px;
          color:white;
        }
          .ai-banner {
  width: 100%;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  animation: glow 2s infinite alternate;
}

.ai-banner h3 {
  margin: 0;
}

.ai-banner p {
  margin: 5px 0 0;
  font-size: 13px;
  opacity: 0.9;
}

@keyframes glow {
  from { transform: scale(1); }
  to { transform: scale(1.02); }
}
      `}</style>
      {/* ===== TOPBAR ===== */}
<div className="topbar"></div>
{/* 🤖 AI RESUME BANNER */}
<div className="ai-banner">
  <div>
    <h3>🤖 AI Resume Builder</h3>
    <p>Create smart resumes using AI — Coming Soon 🚀</p>
  </div>
</div>

      {/* ===== TOPBAR ===== */}
      <div className="topbar">
        <button onClick={logout}>Logout</button>
        <button onClick={save}>Save</button>
        <button onClick={togglePublish}>
          {data.isPublished ? "Unpublish" : "Publish"}
        </button>

        <button onClick={() => setData({ ...data, mode: "dark" })}>🌙</button>
        <button onClick={() => setData({ ...data, mode: "light" })}>☀️</button>

        <button onClick={() => setData({ ...data, template: "glass" })}>
          Glass
        </button>
        <button onClick={() => setData({ ...data, template: "minimal" })}>
          Minimal
        </button>

        {data.isPublished && (
          <>
            <button onClick={copyLink}>Copy Link</button>
            <a href={`/p/${data._id}`} target="_blank">
              🌍 View
            </a>
          </>
        )}
      </div>

      <div className="main">
        {/* ===== LEFT ===== */}
        <div className="left">
          <div className={data.template === "glass" ? "glass" : "minimal"}>
            <h3>Profile</h3>
            <input
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <textarea
              placeholder="Bio"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
            <input
              placeholder="GitHub"
              value={data.github}
              onChange={(e) => setData({ ...data, github: e.target.value })}
            />
            <input type="file" onChange={(e) => upload(e.target.files[0])} />
          </div>

          {/* SKILLS */}
          <div className={data.template === "glass" ? "glass" : "minimal"}>
            <h3>Skills</h3>
            <input
              placeholder="Skill"
              onChange={(e) => setSkill(e.target.value)}
            />
            <input
              placeholder="Icon"
              onChange={(e) => setIcon(e.target.value)}
            />
            <button onClick={addSkill}>Add</button>

            {(data.skills || []).map((s, i) => (
              <div key={i} className="skill">
                {s.icon} {s.name}
              </div>
            ))}
          </div>

          {/* INTERNSHIP */}
          <div className="glass">
            <h3>Internships</h3>
            <button onClick={addInternship}>Add</button>
            {(data.internships || []).map((i, idx) => (
              <div key={idx}>
                <input
                  placeholder="Company"
                  onChange={(e) => {
                    const arr = [...data.internships];
                    arr[idx].company = e.target.value;
                    setData({ ...data, internships: arr });
                  }}
                />
                <input
                  placeholder="Role"
                  onChange={(e) => {
                    const arr = [...data.internships];
                    arr[idx].role = e.target.value;
                    setData({ ...data, internships: arr });
                  }}
                />
                <label>
                  Done
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const arr = [...data.internships];
                      arr[idx].done = e.target.checked;
                      setData({ ...data, internships: arr });
                    }}
                  />
                </label>
              </div>
            ))}
          </div>

          {/* EDUCATION */}
          <div className="glass">
            <h3>Education</h3>
            <button onClick={addEducation}>Add</button>
            {(data.education || []).map((e, idx) => (
              <div key={idx}>
                <input
                  placeholder="School"
                  onChange={(ev) => {
                    const arr = [...data.education];
                    arr[idx].school = ev.target.value;
                    setData({ ...data, education: arr });
                  }}
                />
                <input
                  placeholder="Degree"
                  onChange={(ev) => {
                    const arr = [...data.education];
                    arr[idx].degree = ev.target.value;
                    setData({ ...data, education: arr });
                  }}
                />
              </div>
            ))}
          </div>

          {/* CERTIFICATES */}
          <div className="glass">
            <h3>Certificates</h3>
            <button onClick={addCertificate}>Add</button>
            {(data.certificates || []).map((c, idx) => (
              <input
                key={idx}
                placeholder="Certificate"
                onChange={(e) => {
                  const arr = [...data.certificates];
                  arr[idx].title = e.target.value;
                  setData({ ...data, certificates: arr });
                }}
              />
            ))}
          </div>

          {/* PROJECTS */}
          <div className="glass">
            <h3>Projects</h3>
            <button onClick={addProject}>Add</button>
            {(data.projects || []).map((p, idx) => (
              <input
                key={idx}
                placeholder="Project"
                onChange={(e) => {
                  const arr = [...data.projects];
                  arr[idx].title = e.target.value;
                  setData({ ...data, projects: arr });
                }}
              />
            ))}
          </div>
        </div>

        {/* ===== RIGHT PREVIEW ===== */}
        <div className="right">
          <div style={previewStyle}>
            <h1>{data.name}</h1>
            {data.photo && (
              <img
                src={`http://localhost:5000/uploads/${data.photo}`}
                width="120"
              />
            )}
            <p>{data.bio}</p>

            <h3>Skills</h3>
            {(data.skills || []).map((s, i) => (
              <span key={i} className="skill">
                {s.icon} {s.name}
              </span>
            ))}

            <h3>Internships</h3>
            {(data.internships || []).map((i, idx) => (
              <p key={idx}>
                {i.company} ({i.done ? "Done" : "Ongoing"})
              </p>
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

            <h3>Projects</h3>
            {(data.projects || []).map((p, i) => (
              <p key={i}>{p.title}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
