import React, { useState } from "react";
import styles from "./Favbooks.module.css";

function Myfavbook({ Booksdata, setDelet }) {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";

  const addtocart = async (bookid) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/function/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setDelet(true);
      setLoading(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setLoading(false);
    }
  };

  const removecart = async (bookid) => {
    setLoading(true);
    try {
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

      setDelet(true);
      setLoading(false);
    } catch (error) {
      console.error("Error removing from cart:", error);
      setLoading(false);
    }
  };

  const removefav = async (bookid) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/function/removefav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setDelet(true);
      setLoading(false);
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {Booksdata.length === 0 ? (
        <p>No favorite books to show.</p>
      ) : (
        Booksdata.map((book) => (
          <div className={styles.bookCard} key={book.title}>
            <img src={book.image} alt="book" className={styles.bookImage} />
            <div className={styles.bookInfo}>
              <h2 className={styles.bookTitle}>{book.title}</h2>
              <p className={styles.bookAuthor}>{book.author}</p>
              <p className={styles.bookPrice}>₹{book.price}/-</p>
              <div className={styles.actionButtons}>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {book.cart ? (
                      <button
                        className={styles.addToBagButton}
                        onClick={() => removecart(book._id)}
                      >
                        Remove from Bag
                      </button>
                    ) : (
                      <button
                        className={styles.addToBagButton}
                        onClick={() => addtocart(book._id)}
                      >
                        Add to Bag
                      </button>
                    )}
                    <button
                      className={styles.favButton}
                      onClick={() => removefav(book._id)}
                    >
                      <i
                        className="fa-solid fa-heart"
                        style={{ color: "red" }}
                      ></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Myfavbook;
