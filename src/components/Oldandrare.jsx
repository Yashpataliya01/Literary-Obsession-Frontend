import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppContext } from "../Context/Bookdata";
import styles from "./Oldandrare.module.css";

function Oldandrare({ booktitle, name, stylees }) {
  const token = localStorage.getItem("token");
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://literary-obsession-backend-1.onrender.com/api"
      : "/api";
  const { favcount, setFavcount } = useContext(AppContext);
  const navigate = useNavigate();
  const [userFav, setUserFav] = useState(false); // Corrected useState

  useGSAP(() => {
    gsap.from(`.${styles.mySwiper}`, {
      opacity: 0,
      duration: 2,
      y: 100,
      scrollTrigger: `.${styles.oldandrare}`,
    });
    gsap.to(`.${styles.mySwiper}`, {
      opacity: 1,
      duration: 2,
      y: 0,
      scrollTrigger: `.${styles.oldandrare}`,
    });
  });

  const addtofav = async (bookid) => {
    if (localStorage.getItem("isLogin") === "true") {
      try {
        const response = await fetch(`${apiUrl}/function/addfav`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookid, token }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.json();
        setFavcount(favcount + 1);
        setUserFav(true); // Set userFav to true after adding
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    } else {
      signout();
      navigate("/signin");
    }
  };

  const removefav = async (bookid) => {
    if (localStorage.getItem("isLogin") === "true") {
      try {
        const response = await fetch(`${apiUrl}/function/removefav`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookid, token }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
        setFavcount(favcount - 1);
        setUserFav(false); // Set userFav to false after removing
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    } else {
      signout();
      navigate("/signin");
    }
  };

  const signout = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/signout`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        localStorage.clear();
        navigate("/");
        setFavcount(0);
      }
    } catch (error) {
      console.error("Sign out error:", error);
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/auth/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        const userFavs = new Set(userData.fav || []);
        if (booktitle.some((book) => userFavs.has(book._id))) {
          setUserFav(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [apiUrl, token, booktitle]);

  return (
    <div className={styles.oldandrare}>
      <h1 className={styles.heading} style={{ display: stylees }}>
        {name}
      </h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={styles.mySwiper}
      >
        {booktitle.map((book) => (
          <SwiperSlide className={styles.swiperslide} key={book._id}>
            <Link
              to={{ pathname: `/book/${book.title}` }}
              state={{ ...book, booktitle }}
            >
              <img src={book.image} alt={book.title} className={styles.img} />
            </Link>
            <div className={styles.bookdetails}>
              <h1>{book.title.substring(0, 31)}</h1>
              <p>{book.author}</p>
              <div className={styles.innerdiv}>
                <h2>₹{book.price} /-</h2>
                {userFav ? (
                  <button
                    className={styles.favButton}
                    onClick={() => removefav(book._id)}
                  >
                    <i
                      className="fa-solid fa-heart"
                      style={{ color: "red" }}
                    ></i>
                  </button>
                ) : (
                  <button
                    className={styles.favButton}
                    onClick={() => addtofav(book._id)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={styles.button}>
        <Link
          className={styles.link}
          to={{ pathname: "/books" }}
          state={booktitle}
        >
          View All
        </Link>
      </button>
    </div>
  );
}

export default Oldandrare;
