import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.list}>
        <img
          src="https://img.freepik.com/premium-vector/stack-books-with-cup-coffee-top-them_1253202-14024.jpg?w=740"
          alt=""
        />
        <ul>
          <li>
            <Link className={styles.link} to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={"/about"}>
              About
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={"/contact"}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link className={styles.link}>Terms of Service</Link>
          </li>
          <li>
            <Link className={styles.link}>Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div className={styles.logos}>
        <div className={styles.social}>
          <ul>
            <li>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i className="fa-brands fa-x-twitter"></i>
            </li>
            <li>
              <i className="fa-brands fa-github"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin"></i>
            </li>
          </ul>
        </div>
        <div className={styles.copyright}>
          &#9426; 2024 Literary Obsession. All rights reserved.
        </div>
        <div className={styles.payments}>
          <ul>
            <li>
              <i className="fa-brands fa-cc-visa"></i>
            </li>
            <li>
              <i className="fa-brands fa-cc-mastercard"></i>
            </li>
            <li>
              <i className="fa-brands fa-apple-pay"></i>
            </li>
            <li>
              <i className="fa-brands fa-paypal"></i>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
