import React, { useEffect, useState, useContext } from "react";
import styles from "./Home.module.css";
import Bestseller from "./Bestseller";
import Oldandrare from "./Oldandrare";
import { AppContext } from "../Context/Bookdata";
import Searchbar from "./Searchbar";

function Home() {
  const {
    Classic,
    bestseller,
    categoryselection,
    setcategoryselection,
    filteredBooks,
  } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState("Romance");

  const selectionlist = (e) => {
    const selectedCategory = e.currentTarget.getAttribute("data-value");
    setcategoryselection(selectedCategory);
    setActiveCategory(selectedCategory);
  };

  return (
    <>
      <img src="/home.png" alt="Home" className={styles.homeimg} />
      <div className={styles.home}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1 className={styles.title}>
              Find Your Next
              <br />
              Literary Obsession
            </h1>
          </div>
          <Searchbar booktitle={bestseller} />
        </div>
      </div>
      <Bestseller />
      <Oldandrare booktitle={Classic} name={"Old & Rare"} stylees={"block"} />
      <Oldandrare
        booktitle={bestseller}
        name={"Bestseller"}
        stylees={"block"}
      />
      <div className={styles.topbooksread}>
        <div className={styles.bookrecommend}>
          <div className={styles.overlay}>
            <div className={styles.readingheading}>
              <h1>25 Books to Read Before You Die</h1>
              <button>Read Article</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.categoryfilter}>
        <h1 className={styles.explore}>More to explore</h1>
        <ul className={styles.filterlinks}>
          {[
            "Romance",
            "Horror",
            "Fiction",
            "Biography",
            "Business",
            "Thriller",
          ].map((category) => (
            <li
              key={category}
              onClick={selectionlist}
              data-value={category}
              className={activeCategory === category ? styles.active : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <Oldandrare
        booktitle={filteredBooks}
        name={categoryselection}
        stylees={"none"}
      />
      <div className={styles.authors}>
        <h1 className={styles.hh1}>Featured Authors</h1>
        <ul>
          <li>
            <img
              src="https://images.gr-assets.com/authors/1573928938p5/13905555.jpg"
              alt=""
            />
            <h1>Emily Henry</h1>
          </li>
          <li>
            <img
              src="https://www.gladwellbooks.com/wp-content/uploads/2019/04/GLADWELL_final-jacket-photo_Celeste-Sloman.jpg"
              alt=""
            />
            <h1>Malcolm G.</h1>
          </li>
          <li>
            <img
              src="https://www.neh.gov/sites/default/files/styles/large/public/2019-01/2019_01-Winter_Orwell_01_0.jpg?itok=sN7QYAHi"
              alt=""
            />
            <h1>George Orwell</h1>
          </li>
          <li>
            <img
              src="https://media.newyorker.com/photos/5fdf79049fabedf20ec1f5dd/1:1/w_1963,h_1963,c_limit/Scott-Dickens.jpg"
              alt=""
            />
            <h1>Charles Dickens</h1>
          </li>
          <li>
            <img
              src="https://i.guim.co.uk/img/media/18a8c1d4279dd6522a75f67a1bc3deec204fb467/6_800_3874_2324/master/3874.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1cb42f4e537a4d676309581434a0deb4"
              alt=""
            />
            <h1>Paula Hawkins</h1>
          </li>
          <li>
            <img
              src="https://imgs.search.brave.com/Bq-HYw67U8Q9Dn1QKWBIPrjOBRa28j1DplWBO9AuMUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGVsbG9tYWdh/emluZS5jb20vaG9y/aXpvbi9zcXVhcmUv/ZjVkMjYwNDFhOGNl/LWprLXJvd2xpbmc1/LXQuanBn"
              alt=""
            />
            <h1>J.K. Rowling</h1>
          </li>
          <li>
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-187751114.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
              alt=""
            />
            <h1>Stephen King</h1>
          </li>
          <li>
            <img
              src="https://static01.nyt.com/images/2013/10/21/arts/jpTARTT/jpTARTT-superJumbo.jpg"
              alt=""
            />
            <h1>Donna Tartt</h1>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
