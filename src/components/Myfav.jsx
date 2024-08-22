import React, { useEffect, useState } from "react";
import styles from "./Myfav.module.css";
import Myfavbook from "./Favbooks";

function Myfav() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const [Booksdata, setBooksdata] = useState([]);
  const [delet, setDelet] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/function/getfavbook`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await response.json();
        setBooksdata(user.fav);
      } catch (error) {
        console.error("Error fetching user favorite books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, [delet]);

  return (
    <>
      <h1 className={styles.title}>My Wishlist 💖</h1>
      <div className={styles.books}>
        {loading ? (
          <div className={styles.loader}>Loading...</div>
        ) : Booksdata.length > 0 ? (
          <Myfavbook Booksdata={Booksdata} setDelet={setDelet} />
        ) : (
          <p className={styles.noBooks}>No books in your wishlist yet.</p>
        )}
      </div>
    </>
  );
}

export default Myfav;
