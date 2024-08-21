import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Mycart from "./Mycart";
function Cart() {
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const [Booksdata, setBooksdata] = useState([]);
  const [delet, setDelet] = useState(false);
  useEffect(() => {
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
      }
    };
    fatchingdata();
  }, [delet]);

  return (
    <>
      <Mycart Booksdata={Booksdata} setDelet={setDelet} />
    </>
  );
}

export default Cart;
