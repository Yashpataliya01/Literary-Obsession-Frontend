import React, { useEffect, useState } from "react";
import styles from "./Myfav.module.css";
import Myfavbook from "./Favbooks";

function Myfav() {
  const [Booksdata, setBooksdata] = useState([]);
  const [delet, setDelet] = useState(false);

  useEffect(() => {
    const fatchingdata = async () => {
      try {
        const response = await fetch("/api/function/getfavbook", {
          method: "GET",
        });
        const user = await response.json();
        setBooksdata(user.fav);
      } catch (error) {
        console.error("Error fetching user favorite books:", error);
      }
    };
    fatchingdata();
  }, [delet]);

  return (
    <>
      <h1 className={styles.title}>My Wishlist 💖</h1>
      <div className={styles.books}>
        {Booksdata.length > 0 ? (
          <Myfavbook Booksdata={Booksdata} setDelet={setDelet} />
        ) : (
          <p className={styles.noBooks}>No books in your wishlist yet.</p>
        )}
      </div>
    </>
  );
}

export default Myfav;
