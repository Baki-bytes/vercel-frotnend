import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import API_CONFIG from "../../config/api";

export default function Signup() {
  const navigate = useNavigate();
  const { user, setUser } = ChatState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Prevent access if already logged in
  useEffect(() => {
    if (user) {
      navigate("/chats", { replace: true });
    }
  }, [user, navigate]);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(
        API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.SIGNUP),
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Sync auth state
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);

      navigate("/chats", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create Account</h2>

        {error && <p style={styles.error}>{error}</p>}

        <label><small>Name</small></label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

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
          onClick={handleSignup}
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
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
    maxWidth: "380px",
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
