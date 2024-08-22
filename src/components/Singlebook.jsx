import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/Bookdata";
import styles from "./Singlebook.module.css";

function Singlebook({ Booksdata }) {
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const { setFavcount, setFavcart } = useContext(AppContext);
  const [Books, setBooks] = useState([]);

  useEffect(() => {
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const booksData = await response.json();
        const userData = await userdata.json();

        const userFavorites = new Set(userData.fav || []);
        const userCart = new Set(userData.cart || []);

        const updatedBooksData = booksData.map((book) => ({
          ...book,
          fav: userFavorites.has(book._id),
          cart: userCart.has(book._id),
        }));

        if (
          Booksdata.length > 0 &&
          Booksdata[0].category[0] ===
            Booksdata[Booksdata.length - 1].category[0]
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

    fetchBooks();
  }, []); // Run only once on component mount

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
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookid ? { ...book, cart: false } : book
        )
      );
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <>
      {Books.length > 0 ? (
        Books.map((book) => (
          <div className={styles.book} key={book._id}>
            <img src={book.image} alt={book.title} className={styles.image} />
            <div className={styles.details}>
              <h2 className={styles.title}>{book.title}</h2>
              <p className={styles.author}>By {book.author}</p>
              <p className={styles.price}>${book.price}</p>
              <div className={styles.buttons}>
                {book.fav ? (
                  <button onClick={() => removefav(book._id)}>
                    Remove from Favorites
                  </button>
                ) : (
                  <button onClick={() => addtofav(book._id)}>
                    Add to Favorites
                  </button>
                )}
                {book.cart ? (
                  <button onClick={() => removecart(book._id)}>
                    Remove from Cart
                  </button>
                ) : (
                  <button onClick={() => addtocart(book._id)}>
                    Add to Cart
                  </button>
                )}
                <Link to={`/books/${book._id}`} className={styles.detailsLink}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </>
  );
}

export default Singlebook;
