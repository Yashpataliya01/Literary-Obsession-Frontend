import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../Context/Bookdata";
import Singlebook from "./Singlebook";
import styles from "./Allbooks.module.css";

function Allbooks() {
  const [Booksdata, setBooksdata] = useState([]);
  const { allbooks, categoryselection, setcategoryselection } =
    useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (
      location.state &&
      Array.isArray(location.state) &&
      location.state.length > 0
    ) {
      const bookCategory = location.state[0].category[0];
      setBooksdata(location.state);
      document.getElementById("category").value = bookCategory;
    } else {
      setBooksdata(allbooks);
    }
  }, [location.state]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "All Books") {
      setcategoryselection("All Books");
      setBooksdata(allbooks);
    } else {
      setcategoryselection(selectedCategory);
      const filtered = allbooks.filter((book) =>
        book.category.includes(selectedCategory)
      );
      setBooksdata(filtered);
    }
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    let sortedBooks = [...Booksdata];

    console.log("Selected sort option:", selectedSort);

    switch (selectedSort) {
      case "top":
        sortedBooks.sort((a, b) => b.price - a.price);
        break;
      case "low":
        sortedBooks.sort((a, b) => a.price - b.price);
        break;
      case "new":
        sortedBooks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "old":
        sortedBooks.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "Popularity":
        sortedBooks.sort((a, b) => b.rating - a.rating);
        break;
      case "Relevance":
      default:
        sortedBooks.sort(() => Math.random() - 0.5);
        break;
    }

    console.log("Sorted books:", sortedBooks);
    setBooksdata(sortedBooks);
  };

  return (
    <div className={styles.allbooks}>
      <h1 className={styles.heading}>Explore Books</h1>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="category" className={styles.label}>
            Category:
          </label>
          <select
            name="category"
            id="category"
            className={styles.select}
            onChange={handleCategoryChange}
          >
            <option value="All Books">All Books</option>
            <option value="Romance">Romance</option>
            <option value="Bestseller">Bestseller</option>
            <option value="Classics">Old & Rare</option>
            <option value="Horror">Horror</option>
            <option value="Fiction">Fiction</option>
            <option value="Biography">Biography</option>
            <option value="Business">Business</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>
      </div>
      <div className={styles.books}>
        <Singlebook Booksdata={Booksdata} />
      </div>
    </div>
  );
}

export default Allbooks;
