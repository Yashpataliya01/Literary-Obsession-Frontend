import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Mycart from "./Mycart";
function Cart() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const [Booksdata, setBooksdata] = useState([]);
  const [delet, setDelet] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fatchingdata = async () => {
      try {
        const response = await fetch(`${apiUrl}/function/getcart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await response.json();
        setBooksdata(user.cart);
      } catch (error) {
        console.error("Error fetching user favorite books:", error);
      } finally {
        setLoading(false);
      }
    };
    fatchingdata();
  }, [delet]);

  return (
    <>
      <div className={styles.books}>
        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.circleLoader}></div>
          </div>
        ) : (
          <Mycart Booksdata={Booksdata} setDelet={setDelet} />
        )}
      </div>
    </>
  );
}

export default Cart;
