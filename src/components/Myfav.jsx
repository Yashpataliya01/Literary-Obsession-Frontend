import React, { useEffect, useState } from "react";
import styles from "./Myfav.module.css";
import Myfavbook from "./Favbooks";

function Myfav() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const [Booksdata, setBooksdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooksData = async () => {
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

  useEffect(() => {
    fetchBooksData();
  }, []);

  const updateBooksData = (bookid) => {
    setBooksdata((prevBooksdata) =>
      prevBooksdata.filter((book) => book._id !== bookid)
    );
  };

  return (
    <>
      <h1 className={styles.title}>My Wishlist 💖</h1>
      <div className={styles.books}>
        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.circleLoader}></div>
          </div>
        ) : Booksdata.length > 0 ? (
          <Myfavbook Booksdata={Booksdata} updateBooksData={updateBooksData} />
        ) : (
          <p className={styles.noBooks}>No books in your wishlist yet.</p>
        )}
      </div>
    </>
  );
}

export default Myfav;
