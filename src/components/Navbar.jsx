import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Bookdata";
import styles from "./Navbar.module.css";

function Navbar() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const { favcount, setFavcount, favcart, setFavcart } = useContext(AppContext);
  const navigate = useNavigate();
  const checklogin = () => {
    if (localStorage.getItem("isLogin") === "true") {
      navigate("/profile");
    } else {
      signout();
      navigate("/signin");
    }
  };
  const checkfav = () => {
    if (localStorage.getItem("isLogin") === "true") {
      navigate("/fav");
      setFavcount(0);
    } else {
      signout();
      navigate("/signin");
    }
  };

  const checkcart = () => {
    if (localStorage.getItem("isLogin") === "true") {
      navigate("/cart");
      setFavcart(0);
    } else {
      signout();
      navigate("/signin");
    }
  };

  const signout = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/signout`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        localStorage.clear();
        navigate("/");
        setIslogin(false);
        setFavcount(0);
      }
    } catch {
      navigate("/signin");
    }
  };
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarTop}>
          <div className={styles.navbarLogoIcons}>
            <div className={styles.navbarLogo}>
              <Link to="/">Literary Obsession</Link>
            </div>
            <div className={styles.navbarIcons}>
              <button
                onClick={checklogin}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <i className="fa fa-user" aria-hidden="true"></i>
              </button>
              <button
                onClick={checkfav}
                style={{ backgroundColor: "transparent", border: "none" }}
                className={styles.cartlogo}
              >
                <i className="fa fa-heart" aria-hidden="true"></i>
                {favcount > 0 && (
                  <span className={styles.cartcount}>{favcount}</span>
                )}
              </button>
              <button
                onClick={checkcart}
                style={{ backgroundColor: "transparent", border: "none" }}
                className={styles.cartlogo}
              >
                <div className={styles.cartlogo}>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  {favcart > 0 && (
                    <span className={styles.cartcount}>{favcart}</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className={styles.list}>
        <ul className={styles.navbarLinks}>
          <li>
            <a href="/categories">New & Noteworthy</a>
          </li>
          |
          <li>
            <a href="/categories">Top 50</a>
          </li>
          |
          <li>
            <a href="/categories">Books</a>
          </li>
          |
          <li>
            <a href="/categories">Young Adult</a>
          </li>
          |
          <li>
            <a href="/categories">Sale</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
