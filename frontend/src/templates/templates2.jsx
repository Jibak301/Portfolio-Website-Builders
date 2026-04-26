export default function Template2({ data }) {
  return (
    <div className="t2">
      <h2>{data.name || "Your Name"}</h2>

      <div className="card">
        <p>{data.bio || "Bio goes here..."}</p>
      </div>

      <div>
        <button>GitHub</button>
        <button>LinkedIn</button>
      </div>
    </div>
  );
}
