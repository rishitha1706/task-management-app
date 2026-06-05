import React, { useState } from "react";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        name,
        email,
        password
      });

      alert("Registration Successful");

      window.location.href = "/";
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
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
          className="btn btn-success"
          type="submit"
        >
          Register
        </button>

        <p className="mt-3">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>

      </form>
    </div>
  );
}

export default RegisterPage;