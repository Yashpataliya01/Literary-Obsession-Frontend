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
      const userdata = await fetch(`${apiUrl}/auth/getuser`);
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
        console.log(Booksdata, "Booksssdata");
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

  const addtofav = async (bookid) => {
    try {
      const response = await fetch(`${apiUrl}/function/addfav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setFavcount((prev) => prev + 1);
      setDelet(true);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookid ? { ...book, fav: true } : book
        )
      );
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removefav = async (bookid) => {
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

      setFavcount((prev) => prev - 1);
      setDelet(true);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookid ? { ...book, fav: false } : book
        )
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const addtocart = async (bookid) => {
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

      setFavcart((prev) => prev + 1);
      setDelet(true);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookid ? { ...book, cart: true } : book
        )
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removecart = async (bookid) => {
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

      setFavcart((prev) => prev - 1);
      setDelet(true);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookid ? { ...book, cart: false } : book
        )
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [Booksdata]);

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
                  style={{ backgroundColor: "black" }}
                  onClick={() => addtocart(book._id)}
                >
                  Add to Bag
                </button>
              )}
              {book.fav ? (
                <button
                  className={styles.favButton}
                  onClick={() => removefav(book._id)}
                >
                  <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                </button>
              ) : (
                <button
                  className={styles.favButton}
                  onClick={() => addtofav(book._id)}
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Myfavbook;
