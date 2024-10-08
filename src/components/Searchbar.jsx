import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Bookdata";
import styles from "./Searchbar.module.css";

function Searchbar({ booktitle }) {
  const navigate = useNavigate();
  const { allbooks } = useContext(AppContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [inputval, setInputval] = useState("");
  const [isSuggestionClicked, setIsSuggestionClicked] = useState(false);

  const getdata = (e) => {
    const val = e.target.value.toLowerCase();
    setInputval(e.target.value);

    const data = allbooks.filter((book) =>
      book.title.toLowerCase().includes(val)
    );
    if (val.length > 0 && data.length > 0) {
      setFilteredBooks(data);
    } else {
      setFilteredBooks([]);
    }
  };

  const handleBlur = () => {
    // Check if a suggestion was clicked, if not, clear suggestions
    if (!isSuggestionClicked) {
      setFilteredBooks([]);
    }
  };

  const suggestionclick = (book) => {
    setIsSuggestionClicked(true); // Mark that a suggestion was clicked
    setInputval(book.title);
    navigate(`/book/${book.title}`, { state: { ...book, booktitle } });

    // After navigation, clear suggestions and reset the flag
    setFilteredBooks([]);
    setIsSuggestionClicked(false);
  };

  return (
    <div className={styles.searchbox}>
      <input
        type="search"
        className={styles.search}
        placeholder="Search by Title, Author, ISBN"
        onChange={getdata}
        value={inputval}
        onBlur={handleBlur}
      />
      {filteredBooks.length > 0 && (
        <ul className={styles.suggestions}>
          {filteredBooks.map((book, index) => (
            <li key={index} onMouseDown={() => suggestionclick(book)}>
              <img src={book.image} alt={book.title} />
              <h2>{book.title}</h2>
            </li>
          ))}
        </ul>
      )}
      <button className={styles.searchbtn}>
        <i className="fa-solid fa-search"></i>
      </button>
    </div>
  );
}

export default Searchbar;
