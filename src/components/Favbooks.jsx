import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/Bookdata";
import { Link } from "react-router-dom";
import styles from "./Favbooks.module.css";

function Myfavbook({ Booksdata, updateBooksData }) {
  const { bestseller, setFavcount, setFavcart, favcount, favcart } =
    useContext(AppContext);
  const booktitle = bestseller;
  const [Books, setBooks] = useState([]);
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";

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
    } catch (error) {
      console.error("Error removing from cart:", error);
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
      updateBooksData(bookid);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const userdata = await fetch(`${apiUrl}/auth/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userdata.json();

      const userFavorites = new Set(userData.fav || []);
      const userCart = new Set(userData.cart || []);

      const updatedBooksData = Booksdata.map((book) => ({
        ...book,
        fav: userFavorites.has(book._id),
        cart: userCart.has(book._id),
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

  useEffect(() => {
    fetchBooks();
  }, [updateBooksData, addtocart, removecart]);
  return (
    <>
      {Books.length === 0 ? (
        <p>No favorite books to show.</p>
      ) : (
        Books.map((book) => (
          <div className={styles.bookCard} key={book._id}>
            <Link
              to={{ pathname: `/book/${book.title} ` }}
              state={{ ...book, booktitle }}
            >
              <img src={book.image} alt="book" className={styles.bookImage} />
            </Link>
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
                    onClick={() => addtocart(book._id)}
                  >
                    Add to Bag
                  </button>
                )}
                <button
                  className={styles.favButton}
                  onClick={() => removefav(book._id)}
                >
                  <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Myfavbook;
