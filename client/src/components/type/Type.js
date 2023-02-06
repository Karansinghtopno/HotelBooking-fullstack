import React, { useEffect, useState } from "react";
import classes from "./type.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { endpoint } from "../..";
import img from "../../assets/penthouse.jpg";
import { AiFillStar } from "react-icons/ai";
const Type = () => {
  const [estate, setEstate] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const { type } = useParams();
  console.log(type);

  const fetchTypeRooms = async () => {
    try {
      const res = await fetch(`${endpoint}/room/all?type=${type}`, {
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
    fetchTypeRooms();
  }, [type]);

  console.log(estate);
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>All</h5>
          <h2 className={classes.title}>Pick from the best {type}s</h2>
        </div>
        <div className={classes.places}>
          {estate.map((est) => (
            <Link
              to={`/typedetail/${est._id}`}
              className={classes.place}
              key={est._id}
            >
              <div className={classes.imgWrapper}>
                {/* <img src={`${endpoint}/images/${est.photo}`} alt="room_view" /> */}
                <img src={est.photo} alt="room_view" />
              </div>
              <div className={classes.titleAndReview}>
                <span>{est.title}</span>
                <span className={classes.review}>
                  <AiFillStar className={classes.icon} />
                  {est.review}
                </span>
              </div>
              <div className={classes.countryAndPrice}>
                <span>
                  Country: <span>{est.country}</span>
                </span>
                <span className={classes.price}>
                  ₹{est.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Type;
