export default function Preview({ data }) {
  return (
    <div className="preview-panel">
      {data.photo && <img src={data.photo} className="avatar" />}

      <h1>{data.name}</h1>
      <p>{data.bio}</p>

      <div className="links">
        <a href={data.github}>GitHub</a>
        <a href={data.linkedin}>LinkedIn</a>
      </div>

      <h3>Projects</h3>
      {data.projects.map((p, i) => (
        <div key={i} className="project">
          {p.title}
        </div>
      ))}

      <h3>Skills</h3>
      {data.skills.map((s, i) => (
        <span key={i} className="skill">
          {s.name}
        </span>
      ))}
    </div>
  );
}
