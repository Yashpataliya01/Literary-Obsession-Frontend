import React from "react";
import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>Book Request</h2>
      <form className={styles.form}>
        <div className={styles.row}>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            name="name"
          />
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            name="email"
          />
        </div>
        <div className={styles.row}>
          <input
            type="tel"
            className={styles.input}
            placeholder="Phone Number"
            name="phone"
          />
        </div>
        <div className={styles.row}>
          <textarea
            className={styles.textarea}
            placeholder="Please Request your Book Here or Leave us a Message"
            name="message"
          ></textarea>
        </div>
        <button className={styles.button} type="submit">
          SEND
        </button>
      </form>
    </div>
  );
}

export default Contact;
