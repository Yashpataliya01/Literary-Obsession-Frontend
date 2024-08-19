import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppContext } from "../Context/Bookdata";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Oldandrare.module.css";

gsap.registerPlugin(ScrollTrigger);

function Oldandrare({ booktitle, name, stylees }) {
  const { favcount, setFavcount } = useContext(AppContext);

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

  const addtofav = async (bookid, e) => {
    try {
      const response = await fetch("/api/function/addfav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      setFavcount(favcount + 1);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removefav = async (bookid) => {
    try {
      const response = await fetch("/api/function/removefav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      setFavcount(favcount + 1);
    } catch (error) {
      console.error("Error removing to favorites:", error);
    }
  };

  return (
    <>
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
            <SwiperSlide className={styles.swiperslide} key={book.title}>
              <Link
                to={{ pathname: `/book/${book.title} ` }}
                state={{ ...book, booktitle }}
              >
                <img src={book.image} alt={book.title} className={styles.img} />
              </Link>
              <div className={styles.bookdetails}>
                <h1>{book.title.substring(0, 31)}</h1>
                <p>{book.author}</p>
                <div className={styles.innerdiv}>
                  <h2>₹{book.price} /-</h2>
                  {book.fav ? (
                    <button
                      className={styles.favButton}
                      onClick={(e) => removefav(book._id)}
                    >
                      <i
                        className="fa-solid fa-heart"
                        style={{ color: "red" }}
                      ></i>
                    </button>
                  ) : (
                    <button
                      className={styles.favButton}
                      onClick={(e) => addtofav(book._id, e)}
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
    </>
  );
}

export default Oldandrare;
