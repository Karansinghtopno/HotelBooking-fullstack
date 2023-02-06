import React, { useState, useEffect } from "react";
import classes from "./suggestedPlaces.module.css";
import { useSelector } from "react-redux";
import { endpoint } from "../../index";
import { Link } from "react-router-dom";
import img from "../../assets/img2.jpg";
import { AiFillStar } from "react-icons/ai";

const SuggestedPlaces = () => {
  const [estate, setEstate] = useState([]);
  const { token } = useSelector((state) => state.auth);

  // console.log(endpoint)
  const fetchTypesRoom = async () => {
    try {
      const res = await fetch(`${endpoint}/room/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log(data.rooms);
      setEstate(data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTypesRoom();
  }, []);

  console.log(estate);
  return (
    <section id="suggested" className={classes.container}
    // style={{border:"1px solid black"}}
    >
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>Most visited Places</h5>
          <h2 className={classes.title}>
            Favourite destination of our clients
          </h2>
        </div>
        <div className={classes.places}>
          {estate.slice(0,6).map((suggested) => {
            return (
              <Link
                to={`/typedetail/${suggested._id}`}
                className={classes.place}
                key={suggested._id}
              >
                <div className={classes.imgWrapper}>
                  <img src={img} alt="suggested_places" />
                </div>
                <div className={classes.titleAndReview}>
                  <span>{suggested.title}</span>
                  <span className={classes.review}>
                    <AiFillStar className={classes.icon} />
                    {suggested.review}
                  </span>
                </div>
                <div className={classes.countryAndPrice}>
                  <span>
                    Country: <span>{suggested.country}</span>
                  </span>
                  <span className={classes.price}>
                    Price: <span>₹{suggested.price}</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuggestedPlaces;
