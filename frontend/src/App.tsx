import { useEffect, useState } from "react";
import { API_BASE_URL, getHello } from "./api/client";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getHello()
      .then((data) => {
        if (!cancelled) {
          setMessage(data.message);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setMessage("");
          setError(err instanceof Error ? err.message : "Failed to reach API");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="app">
      <h1>Frontend + Backend Starter</h1>
      <p className="muted">React (Vite) talking to a Node.js REST API</p>

      <section className="card">
        <h2>API response</h2>
        {error ? <p className="error">{error}</p> : <p>{message}</p>}
        <p className="muted">Base URL: {API_BASE_URL}</p>
      </section>
    </main>
  );
}

export default App;
