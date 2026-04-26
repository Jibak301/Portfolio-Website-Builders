// components/Layout.jsx
export default function Layout({ children }) {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: sans-serif;
        }

        .app-bg {
          min-height: 100vh;
          background: linear-gradient(-45deg,#020617,#0f172a,#1e293b,#020617);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
          position: relative;
          overflow: hidden;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* floating blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .b1 {
          width: 300px; height: 300px;
          background: #6366f1;
          top: 10%; left: 10%;
          animation: float 6s infinite alternate;
        }

        .b2 {
          width: 250px; height: 250px;
          background: #22c55e;
          bottom: 10%; right: 10%;
          animation: float 8s infinite alternate;
        }

        @keyframes float {
          from { transform: translateY(0); }
          to { transform: translateY(-40px); }
        }

        .glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          padding: 20px;
        }

        .fade {
          animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
      `}</style>

      <div className="app-bg">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        {children}
      </div>
    </>
  );
}
