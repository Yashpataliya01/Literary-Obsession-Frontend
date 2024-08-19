import React from "react";
import styles from "./Favbooks.module.css";
function Myfavbook({ Booksdata, setDelet }) {
  const removefav = async (bookid) => {
    setDelet(false);
    try {
      const response = await fetch("/api/function/removefav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      setDelet(true);
    } catch (error) {
      console.error("Error removing to favorites:", error);
    }
  };

  return (
    <>
      {Booksdata.map((book) => (
        <div className={styles.bookCard} key={book.title}>
          <img src={book.image} alt="book" className={styles.bookImage} />
          <div className={styles.bookInfo}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookAuthor}>{book.author}</p>
            <p className={styles.bookPrice}>₹{book.price}/-</p>
            <div className={styles.actionButtons}>
              <button className={styles.addToBagButton}>Add to Bag</button>
              <button
                className={styles.favButton}
                onClick={(e) => removefav(book._id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Myfavbook;
