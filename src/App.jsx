import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LocomotiveScroll from "locomotive-scroll";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import About from "./components/About";
import Contact from "./components/Contact";
import Allbooks from "./components/Allbooks";
import { AppProvider } from "./Context/Bookdata";
import Detailbook from "./components/Detailbook";
import Myfav from "./components/Myfav";
import Cart from "./components/Cart";
import Buy from "./components/Buy";
import Scrolltotop from "./components/Scrolltotop";

function App() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <AppProvider>
      <BrowserRouter>
        <Scrolltotop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/books" element={<Allbooks />} />
            <Route path="/fav" element={<Myfav />} />
            <Route path="/book/:title" element={<Detailbook />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Buy />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
