import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Bookdata";
import Oldandrare from "./Oldandrare";
import styles from "./Detailbook.module.css";

function Detailbook() {
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [usercart, setusercart] = useState(false);
  const [loading, setLoading] = useState(true);
  const { favcart, setFavcart } = useContext(AppContext);

  const addtocart = async (bookid) => {
    if (localStorage.getItem("isLogin") === "true") {
      try {
        setusercart(true);
        setLoading(true);
        const res = await fetch(`${apiUrl}/function/addtocart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookid, token }),
        });
        setLoading(false);
        navigate("/cart");
      } catch (error) {
        alert(error);
        setusercart(false);
        setLoading(false);
      }
    } else {
      navigate("/signin");
    }
  };

  const removecart = async (bookid) => {
    if (localStorage.getItem("isLogin") === "true") {
      try {
        setusercart(false);
        setLoading(true);
        const response = await fetch(`${apiUrl}/function/removecart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookid, token }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setFavcart((prev) => prev - 1);
        setLoading(false);
      } catch (error) {
        setusercart(true);
        setLoading(false);
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userdata = await fetch(`${apiUrl}/auth/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userdata.json();
        const userCart = new Set(userData.cart || []);
        if (userCart.has(state._id)) {
          setusercart(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [state._id]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left}>
          <img src={state.image} alt={state.title} />
        </div>
        <div className={styles.right}>
          <div>
            <h3>{state.category[0]}</h3>
            <h1 className={styles.title}>{state.title}</h1>
            <p className={styles.price}>Rs. {state.price}/-</p>
          </div>
          <div className={styles.btns}>
            {loading ? (
              <button className={styles.addToCart}>Loading...</button>
            ) : usercart ? (
              <button
                className={styles.addToCart}
                onClick={() => removecart(state._id)}
              >
                REMOVE <i className="fa-solid fa-cart-shopping"></i>
              </button>
            ) : (
              <button
                className={styles.addToCart}
                onClick={() => addtocart(state._id)}
              >
                ADD TO CART <i className="fa-solid fa-cart-shopping"></i>
              </button>
            )}
          </div>
          <div>
            <p className={styles.description}>{state.description}</p>
            <h4>By - {state.author}</h4>
          </div>
        </div>
      </div>
      <div className={styles.similar}>
        <h1>Explore Similar</h1>
        <div style={{ width: "100%" }}>
          {state.Books ? (
            <Oldandrare booktitle={state.Books} stylees={"none"} />
          ) : (
            <Oldandrare booktitle={state.booktitle} stylees={"none"} />
          )}
        </div>
      </div>
    </>
  );
}

export default Detailbook;
