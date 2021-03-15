import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";

const Main = () => {
  return (
    <Router>
      <NavBar />
      <Body />
      <Footer />
    </Router>
  );
};

export default Main;
