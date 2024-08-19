import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/Bookdata";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();
  const { setIslogin, setFavcount } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userorder, setUserorder] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/getuser");
        if (!response.ok) {
          navigate("/signin");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
        setUserorder(data.buyed);
        console.log(data.buyed);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const signout = async () => {
    try {
      const response = await fetch("/api/auth/signout");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        localStorage.clear();
        navigate("/");
        setIslogin(false);
        setFavcount(0);
      }
    } catch {
      navigate("/signin");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.sidebar}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "profile" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <i className="fas fa-user-circle"></i> Profile
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "orders" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("orders")}
        >
          <i className="fas fa-shopping-cart"></i> Orders
        </button>
      </div>
      <div className={styles.content}>
        <h1>My Account</h1>
        {activeTab === "profile" && userData && (
          <div className={styles.profileDetails}>
            <img
              src="https://images.unsplash.com/photo-1635107510862-53886e926b74?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User"
              className={styles.profileImage}
            />
            <h2>{userData.username || "User Name"}</h2>
            <p>{userData.email || "user@example.com"}</p>
            <button className={styles.editButton} onClick={signout}>
              Sign Out
            </button>
          </div>
        )}
        {activeTab === "orders" && (
          <div>
            <h2>Recent Orders</h2>
            {userorder.map((order, index) => (
              <div key={index} className={styles.orderDetails}>
                <div className={styles.orderItem}>
                  <img src={order.image} alt="Order" />
                  <div>
                    <p>{order.bookname}</p>
                    <p>{order.address}</p>
                    <p>Delivery: {order.delivery}</p>
                    <p>Payment Method: {order.modofpayment}</p>
                    <p>Price: ${order.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
