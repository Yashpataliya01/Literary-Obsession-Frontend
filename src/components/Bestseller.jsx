import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Bestseller.module.css";

gsap.registerPlugin(ScrollTrigger);

function Bestseller() {
  useGSAP(() => {
    gsap.from(`.${styles.book}`, {
      opacity: 0,
      duration: 2,
      x: -500,
      scrollTrigger: `.${styles.heading}`,
    }),
      gsap.from(`.${styles.heading}`, {
        opacity: 0,
        duration: 2,
        x: 500,
        scrollTrigger: `.${styles.heading}`,
      });
  });
  return (
    <>
      <div className={styles.contaner}>
        <div className={styles.innerdiv}>
          <div className={styles.book}>
            <img
              src="https://jameshwhitmorereviews.com/wp-content/uploads/2023/08/img_2245.jpg"
              alt=""
              className={styles.img}
            />
          </div>
          <div className={styles.heading}>
            <h1>Obsession's Best Seller</h1>
            <h2>A Passage to India</h2>
            <h3>Novel by E. M. Forster</h3>
            <p>
              The novel explores the complex relationships between the British
              colonizers and the Indian people, focusing on the experiences of
              Dr. Aziz, a young Muslim doctor, and Cyril Fielding, a British
              schoolteacher. The story revolves around a misunderstanding that
              leads to a trial, and the subsequent exploration of the themes of
              racism, colonialism, and the impossibility of true friendship
              between the two cultures.
            </p>
            <div className={styles.buynou}>
              <button className={styles.button}>
                <svg
                  viewBox="0 0 16 16"
                  className={styles.check}
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                >
                  <path
                    className={styles.check}
                    d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                  ></path>
                  <path
                    className={styles.check}
                    d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                  ></path>
                </svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bestseller;
