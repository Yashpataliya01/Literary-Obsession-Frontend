import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Mycart from "./Mycart";
function Cart() {
  const [Booksdata, setBooksdata] = useState([]);
  const [delet, setDelet] = useState(false);
  useEffect(() => {
    const fatchingdata = async () => {
      try {
        const response = await fetch("/api/function/getcart", {
          method: "GET",
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
