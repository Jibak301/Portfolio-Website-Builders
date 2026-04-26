const BASE = "http://localhost:5000/api";

export const api = async (url, method = "GET", body) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(BASE + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // ✅ correct
      },
      body: body ? JSON.stringify(body) : null,
    });

    // ✅ handle error responses
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.msg || "API Error");
    }

    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err.message);
    alert(err.message);
    return null;
  }
};