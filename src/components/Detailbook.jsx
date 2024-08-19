import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Bookdata";
import Oldandrare from "./Oldandrare";
import styles from "./Detailbook.module.css";

function Detailbook() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const { favcart, setFavcart } = useContext(AppContext);

  const addtocart = async (bookid) => {
    try {
      const res = await fetch("/api/function/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid }),
      });
      navigate("/cart");
    } catch (error) {
      alert(error);
    }
  };
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
            <button
              className={styles.addToCart}
              onClick={(e) => addtocart(state._id)}
            >
              ADD TO CART <i className="fa-solid fa-cart-shopping"></i>
            </button>
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
