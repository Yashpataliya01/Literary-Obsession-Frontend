import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

function Signup() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const navigate = useNavigate();
  const handlesignup = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const userdata = {
      username: formdata.get("username"),
      email: formdata.get("email"),
      password: formdata.get("password"),
    };
    try {
      const res = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create user");
      }
      const result = await res.json();
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.error("Error during sign up:", error);
      alert(`Error: ${error}}`);
    }
  };
  return (
    <div className={styles.signin}>
      <div className={styles.right}>
        <h1 className={styles.welcomeTitle}>Welcome</h1>
        <p className={styles.welcomeText}>
          Welcome to Literary Obsession, a haven for book lovers, aspiring
          writers, and literary enthusiasts! By joining our community, you gain
          access to a world of rich literary content, engaging discussions, and
          exclusive resources tailored just for you.
        </p>
      </div>
      <div className={styles.left}>
        <h1 className={styles.title}>Create User</h1>
        <form className={styles.form} onSubmit={handlesignup}>
          <input
            placeholder="Username"
            type="text"
            className={styles.input}
            name="username"
          />
          <input
            placeholder="Email"
            type="email"
            className={styles.input}
            name="email"
          />
          <input
            placeholder="Create Password"
            type="password"
            className={styles.input}
            name="password"
          />
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>
        <h5>
          Already a user?{" "}
          <Link style={{ textDecoration: "none" }} to={"/signin"}>
            <span>Sign In</span>
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default Signup;
