export default function Template1({ data }) {
  return (
    <div className="t1">
      <h1>{data.name || "Your Name"}</h1>
      <p>{data.bio || "Your bio..."}</p>

      <a href={data.github}>GitHub</a>
      <a href={data.linkedin}>LinkedIn</a>
    </div>
  );
}
