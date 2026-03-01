import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import API_CONFIG from "../../config/api";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = ChatState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect ONLY if already logged in
  useEffect(() => {
    if (user) {
      navigate("/chats", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(
        API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN),
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Sync everything
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);

      navigate("/chats", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <label><small>Email</small></label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label><small>Password</small></label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f0f0f",
  },
  container: {
    width: "100%",
    maxWidth: "360px",
    padding: "1.5rem",
    backgroundColor: "#1b1b1b",
    color: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  },
  input: {
    width: "100%",
    backgroundColor: "#141414",
    marginBottom: "12px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #333",
    color: "#f5f5f5",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#6264A7",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    opacity: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};
