import React, { useState } from "react";
import { loginUser } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser({
        email,
        password,
      });

      alert("Login Successful");

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Login
        </button>

        <p className="mt-3">
          Don't have an account?{" "}
          <a href="/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;