import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Mycart.module.css";

function Mycart({ Booksdata, setDelet }) {
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const [bookprices, setBookprices] = useState(0);
  const [booktax, setBooktax] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    let totalPrice = 0;
    Booksdata.forEach((book) => {
      totalPrice += book.price * (quantities[book._id] || 1);
    });
    setBookprices(totalPrice);
    setBooktax((totalPrice * 12) / 100);
  }, [Booksdata, quantities]);

  const handleQuantityChange = (bookId, increment) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[bookId] || 1) + increment;
      return {
        ...prevQuantities,
        [bookId]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };

  const removecart = async (bookId) => {
    setDelet(false);
    try {
      const response = await fetch(`${apiUrl}/function/removecart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setDelet(true);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handlePromoCode = () => {
    console.log("Promo code applied");
  };

  const totalAmount = bookprices + booktax;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        {Booksdata.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty.</p>
        ) : (
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Availability</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Booksdata.map((book) => (
                <tr key={book._id} className={styles.bookRow}>
                  <td>
                    <img
                      src={book.image}
                      alt={book.title}
                      className={styles.bookImage}
                    />
                  </td>
                  <td>
                    <div className={styles.bookDetails}>
                      <strong>{book.title}</strong>
                      <br />
                      <span>{book.author}</span>
                    </div>
                  </td>
                  <td>{book.availability} in store</td>
                  <td>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => handleQuantityChange(book._id, -1)}
                      >
                        -
                      </button>
                      <span>{quantities[book._id] || 1}</span>
                      <button onClick={() => handleQuantityChange(book._id, 1)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹{book.price}</td>
                  <td>
                    <button
                      className={styles.removeButton}
                      onClick={() => removecart(book._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.promoSection}>
          <input
            type="text"
            placeholder="Promo code"
            className={styles.promoInput}
          />
          <button className={styles.promoButton} onClick={handlePromoCode}>
            Add
          </button>
        </div>
        <div className={styles.summaryDetails}>
          <p>Price: ₹{bookprices}/-</p>
          <p>Subtotal: ₹{bookprices}/-</p>
          <p>Tax: ₹{booktax}/-</p>
          <h3>Total: ₹{totalAmount}/-</h3>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/order"
            state={{ books: Booksdata, quantities, booktax, totalAmount }}
          >
            <button className={styles.checkoutButton}>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Mycart;
