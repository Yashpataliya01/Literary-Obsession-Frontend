import React, { useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/Bookdata";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signin.module.css";

function Signin() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const navigate = useNavigate();
  const { setIslogin } = useContext(AppContext);

  const handlesignin = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const userdata = {
      email: formdata.get("email"),
      password: formdata.get("password"),
    };

    try {
      const response = await axios.post(`${apiUrl}/auth/signin`, userdata, {
        withCredentials: true, // Include credentials in request (for cookies)
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      localStorage.setItem("isLogin", true);
      setIslogin(true);
      navigate("/");
    } catch (error) {
      console.error("Error during sign in:", error);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className={styles.signin}>
      <div className={styles.right}>
        <h1 className={styles.welcomeTitle}>Welcome Back</h1>
        <p className={styles.welcomeText}>
          To continue exploring our collection of books, please sign in to your
          account. If you're new here, we invite you to create an account and
          join our community of book lovers.
        </p>
      </div>
      <div className={styles.left}>
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.form} onSubmit={handlesignin}>
          <input
            placeholder="Email"
            type="email"
            className={styles.input}
            name="email"
          />
          <input
            placeholder="Password"
            type="password"
            className={styles.input}
            name="password"
          />
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
        <h5>
          Don't have an account?{" "}
          <Link style={{ textDecoration: "none" }} to={"/signup"}>
            <span>Sign Up</span>
          </Link>
        </h5>
      </div>
    </div>
  );
}

export default Signin;
