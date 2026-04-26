function Preview({ data }) {
  if (data.template === "template2") {
    return (
      <div className="card-template">
        <h1>{data.name}</h1>
        <p>{data.bio}</p>

        <div className="card-grid">
          {data.projects.map((p, i) => (
            <div key={i} className="card">
              <p>{p.title}</p>
              {p.image && (
                <img src={`http://localhost:5000/uploads/${p.image}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DEFAULT TEMPLATE
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>

      <h3>Skills</h3>
      {data.skills.map((s, i) => (
        <span key={i} className="tag">
          {s}
        </span>
      ))}

      <h3>Projects</h3>
      {data.projects.map((p, i) => (
        <p key={i}>{p.title}</p>
      ))}
    </div>
  );
}
