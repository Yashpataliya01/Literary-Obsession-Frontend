import React, { useContext, useEffect, useState } from "react";
import styles from "./Favbooks.module.css";
import { AppContext } from "../Context/Bookdata";

function Myfavbook({ Booksdata, setDelet }) {
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const { setFavcount, setFavcart } = useContext(AppContext);
  const [Books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${apiUrl}/books/finduser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userdata = await fetch(`${apiUrl}/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const booksData = await response.json();
      const userData = await userdata.json();

      const userFavorites = new Set(userData.fav || []);
      const updatedBooksData = booksData.map((book) => ({
        ...book,
        fav: userFavorites.has(book._id),
        cart: userFavorites.has(book._id),
      }));

      if (
        Booksdata.length > 0 &&
        Booksdata[0].category[0] === Booksdata[Booksdata.length - 1].category[0]
      ) {
        setBooks(
          updatedBooksData.filter((book) =>
            book.category.includes(Booksdata[0].category[0])
          )
        );
      } else {
        setBooks(updatedBooksData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFavorite = async (bookid, isFavorite) => {
    try {
      const url = `${apiUrl}/function/${isFavorite ? "removefav" : "addfav"}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setFavcount((prev) => (isFavorite ? prev - 1 : prev + 1));
      setDelet(true);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookid ? { ...book, fav: !isFavorite } : book
        )
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const handleCart = async (bookid, isInCart) => {
    try {
      const url = `${apiUrl}/function/${isInCart ? "removecart" : "addtocart"}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setFavcart((prev) => (isInCart ? prev - 1 : prev + 1));
      setDelet(true);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookid ? { ...book, cart: !isInCart } : book
        )
      );
    } catch (error) {
      console.error("Error updating cart status:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [Booksdata]);

  return (
    <>
      {Books.map((book) => (
        <div className={styles.bookCard} key={book._id}>
          <img src={book.image} alt="book" className={styles.bookImage} />
          <div className={styles.bookInfo}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookAuthor}>{book.author}</p>
            <p className={styles.bookPrice}>₹{book.price}/-</p>
            <div className={styles.actionButtons}>
              <button
                className={styles.addToBagButton}
                onClick={() => handleCart(book._id, book.cart)}
              >
                {book.cart ? "Remove from Bag" : "Add to Bag"}
              </button>
              <button
                className={styles.favButton}
                onClick={() => handleFavorite(book._id, book.fav)}
              >
                <i
                  className={`fa-${book.fav ? "solid" : "regular"} fa-heart`}
                  style={{ color: book.fav ? "red" : "black" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Myfavbook;
