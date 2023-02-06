import React from "react";
import About from "../about/About";
import SuggestedPlaces from "../suggestedPlaces/SuggestedPlaces";
import Types from "../types/Types";
import classes from "./home.module.css";
const Home = () => {
  return (
    <section id="#" className={classes.container}>
      <About />
      <Types />
      <SuggestedPlaces/>
    </section>
  );
};

export default Home;
