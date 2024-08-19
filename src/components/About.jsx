import React from "react";
import abouthero from "../../public/abouthero.png";
import styles from "./About.module.css";

function About() {
  return (
    <>
      <img src={abouthero} alt="" className={styles.imgs} />
      <div className={styles.about}>
        <div className={styles.hero}>
          <div className={styles.opacity}></div>
          <h1>About Us</h1>
        </div>
        <div className={styles.info}>
          <p>
            <b>Literary Obsession</b> is a dream realised for Mr. Raju Singh,
            the visionary behind our venture. To have a space one could easily
            imagine as an extension of their home, their own private den.
            Designed as a temporary reprieve from the outside world, where time
            can slow down and you could browse books without the white noise of
            social media.
            <br />
            <br />
            Reflective of the colonial library style, Literary Obsession is a
            space where every book on the shelf has been hand-picked and curated
            to suit the sensibility of readers that seek beyond the mainstream.
            Our collection is expansive in the genres we keep but each book here
            is selected after careful consideration.
            <br />
            <br />
            As the year turned to 2017, we opened our doors and since then have
            had the opportunity to develop a cosy community of book-lovers - one
            that we are always happy to expand.
            <br />
            <br />
            Featured among our expansive list of curated titles are tomes that
            have transcended the nomenclature of 'books' and present more as
            time capsules. These 'rare and used' books complete the ethos of
            Literary Obsession to not just transport the fellow bibliophile into
            a different era but also to feel at home in revisiting old
            favorites.
            <br />
            <br />
            Rarity doesn't simply mean that something is old and hard to find. A
            rare book is one that is important, desirable, and scarce. An
            important book is one that has had a profound impact from the time
            it was printed and continues to be influential, a true
            representation of the socio-economic mood, the human condition
            prevalent upon its inception.
            <br />
            <br />A number of factors can affect the scarcity of a book,
            including printing history, the number of copies printed or sold,
            the quality of the paper and binding (the more fragile the book, the
            less likely it will survive in fine condition), any controversy
            surrounding the book, its popularity (or lack thereof) and its
            genre.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
