import React, { useState, useContext } from "react";
import { AppContext } from "../Context/Bookdata";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Buy.module.css";

function Buy() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedPayment, setSelectedPayment] = useState("Credit Card");
  const { userdata } = useContext(AppContext);
  const location = useLocation();
  const Booksdatas = location.state?.books || [];
  const quantities = location.state?.quantities || {};
  const booktax = location.state?.booktax || 0;
  const allprice = location.state?.totalAmount || 0;
  const [selectedOption, setSelectedOption] = useState("");
  const [buyed, setBuyed] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const placeorder = async (e) => {
    e.preventDefault();
    const {
      country,
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      phoneNumber,
    } = formData;
    if (
      !country ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !phoneNumber
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const newBuyedData = Booksdatas.map((book) => ({
      bookname: book.title,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.postalCode}`,
      delivery: "Standard Delivery",
      modofpayment: selectedPayment,
      price: book.price * (quantities[book._id] || 1),
      image: book.image,
    }));
    setBuyed([...buyed, ...newBuyedData]);
    console.log("Order placed with the following books:", newBuyedData);
    try {
      const response = await fetch(`${apiUrl}/function/updatebuyed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newBuyedData, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      Navigate("/profile");
      setBuyed([]);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
    setFormData({
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phoneNumber: "",
    });
    setSelectedPayment("Credit Card");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.accountSection}>
          <h3>Account</h3>
          <p>{userdata.email}</p>
          <hr />
        </div>
        <div className={styles.deliverySection}>
          <h3>Delivery</h3>
          <form onSubmit={placeorder}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="country"
                placeholder="Country/Region"
                className={styles.selectInput}
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={styles.input}
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={styles.input}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className={styles.input}
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className={styles.input}
              value={formData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className={styles.input}
              value={formData.state}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              className={styles.input}
              maxLength="6"
              value={formData.postalCode}
              onChange={handleChange}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className={styles.input}
              maxLength="10"
              value={formData.phoneNumber}
              onChange={handleChange}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
            />
            <hr />
            <div className={styles.paymentSection}>
              <h3>Payment</h3>
              <div className={styles.paymentMethod}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Credit Card"
                    checked={selectedPayment === "Credit Card"}
                    onChange={() => setSelectedPayment("Credit Card")}
                  />
                  Credit Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="PayPal"
                    checked={selectedPayment === "PayPal"}
                    onChange={() => setSelectedPayment("PayPal")}
                  />
                  PayPal
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={selectedPayment === "Cash on Delivery"}
                    onChange={() => setSelectedPayment("Cash on Delivery")}
                  />
                  Cash on Delivery
                </label>
              </div>
              {selectedPayment === "Credit Card" && (
                <div className={styles.creditCardDetails}>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className={`${styles.input} ${styles.iconInput}`}
                  />
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Expiration Date (MM / YY)"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Security Code"
                      className={styles.input}
                      maxLength="3"
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className={styles.input}
                  />
                </div>
              )}
              {selectedPayment === "PayPal" && (
                <div className={styles.paypalOptions}>
                  <div
                    className={`${styles.paypalOption} ${
                      selectedOption === "GPay" ? styles.selectedOption : ""
                    }`}
                    onClick={() => handleOptionClick("GPay")}
                  >
                    <i className="fa-brands fa-google-pay"></i>
                  </div>
                  <div
                    className={`${styles.paypalOption} ${
                      selectedOption === "Apple Pay"
                        ? styles.selectedOption
                        : ""
                    }`}
                    onClick={() => handleOptionClick("Apple Pay")}
                  >
                    <i className="fa-brands fa-apple-pay"></i>
                  </div>
                  <div
                    className={`${styles.paypalOption} ${
                      selectedOption === "Paytm" ? styles.selectedOption : ""
                    }`}
                    onClick={() => handleOptionClick("Paytm")}
                  >
                    <i className="fa-brands fa-paypal"></i>
                  </div>
                  <div
                    className={`${styles.paypalOption} ${
                      selectedOption === "Amazon Pay"
                        ? styles.selectedOption
                        : ""
                    }`}
                    onClick={() => handleOptionClick("Amazon Pay")}
                  >
                    <i className="fa-brands fa-amazon-pay"></i>
                  </div>
                </div>
              )}
              {selectedPayment === "Cash on Delivery" && (
                <p>Pay with cash upon delivery.</p>
              )}
              <button type="submit" className={styles.placeOrderButton}>
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.orderSummary}>
          <h3 className={styles.hh3}>Order Summary</h3>
          {Booksdatas.map((book) => (
            <div className={styles.productInfo} key={book._id}>
              <img src={book.image} alt={book.title} />
              <div className={styles.productDetails}>
                <h4>{book.title}</h4>
                <p>Quantity: {quantities[book._id] || 1}</p>
                <p>{(book.price * (quantities[book._id] || 1)).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className={styles.discountWrapper}>
            <input
              type="text"
              placeholder="Discount code or gift card"
              className={styles.discountInput}
            />
            <button className={styles.applyButton}>Apply</button>
          </div>
          <div className={styles.totalSummary}>
            <p>Shipping: FREE</p>
            <p>Tax: ₹{booktax}/-</p>
            <h3>Total: ₹{allprice}/-</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
