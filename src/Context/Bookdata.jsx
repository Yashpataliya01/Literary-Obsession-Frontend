import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";

  const [Classic, setClassic] = useState([]);
  const [bestseller, setbestseller] = useState([]);
  const [categoryselection, setcategoryselection] = useState("Romance");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [allbooks, setAllbooks] = useState([]);
  const [islogin, setIslogin] = useState(false);
  const [favcount, setFavcount] = useState(0);
  const [favcart, setFavcart] = useState(0);
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/books/finduser`, {
          method: "GET",
        });
        const userdata = await fetch(`${apiUrl}/auth/getuser`);
        const booksData = await response.json();
        const userData = await userdata.json();
        setUserData(userData);
        const userFavorites = new Set(userData.fav || []);
        const updatedBooksData = booksData.map((book) => ({
          ...book,
          fav: userFavorites.has(book._id),
        }));

        setbestseller(
          updatedBooksData.filter((book) =>
            book.category.includes("Bestseller")
          )
        );
        setClassic(
          updatedBooksData.filter((book) => book.category.includes("Classics"))
        );
        setFilteredBooks(
          updatedBooksData.filter((book) =>
            book.category.includes(categoryselection)
          )
        );
        setAllbooks(updatedBooksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categoryselection, islogin, favcount, favcart]);

  return (
    <AppContext.Provider
      value={{
        Classic,
        setClassic,
        bestseller,
        setbestseller,
        categoryselection,
        setcategoryselection,
        filteredBooks,
        setFilteredBooks,
        allbooks,
        setIslogin,
        favcount,
        setFavcount,
        favcart,
        setFavcart,
        userdata,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
