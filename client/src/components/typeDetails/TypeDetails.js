import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./typeDetails.module.css";
import image from "../../assets/apartment.jpg";
import { endpoint } from "../../index";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { getDatesInRange, isUnavailable } from "../../utils/dateFunc.js";

const TypeDetails = () => {
  const [roomDetails, setRoomDetails] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const containerRef = useRef();

  const fetchRoom = async () => {
    const res = await fetch(`${endpoint}/room/find/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    // console.log(data.room);
    setRoomDetails(data.room);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const yourBookedDates = getDatesInRange(startDate, endDate);
    const isunavailableDates = isUnavailable(roomDetails, yourBookedDates);
    if (isunavailableDates) {
      const lastAvailableDates = new Date(
        roomDetails.unavailableDates[roomDetails.unavailableDates.length - 1]
      );
      const lastAvailableDay = lastAvailableDates.getDate();
      const lastAvailableMonth = lastAvailableDates.getMonth();
      //+1 for month (jan start with 0)
      const formattedMonth =
        lastAvailableMonth + 1 > 9
          ? `${lastAvailableMonth + 1}`
          : `0${lastAvailableMonth+1}`;
      // 3->03 , 1->01
      const formattedDay =
        lastAvailableDay > 9 ? `${lastAvailableDay}` : `0${lastAvailableDay}`;

        const formattedDayAndMonth= `${formattedDay} ${formattedMonth}`;

        setError(formattedDayAndMonth)
        setTimeout(()=>{
          setError(false);
        },5000)

        return;
    }

    try {
      const res = await fetch(`${endpoint}/room/bookroom/${id}`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        method:"PUT",
        body: JSON.stringify({username,email,unavailableDates:yourBookedDates})
      })
      
      setSuccess(true)
      setTimeout(()=>{
        setSuccess(false)
      },5000)
      const updatedRoom = await res.json();
      setRoomDetails(updatedRoom)

      
    } catch (error) {
      console.error(error.message)
    }
  };
  useEffect(() => {
    fetchRoom();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(id);
  console.log(roomDetails);
  return (
    <div ref={containerRef} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.imgWrapper}>
            <img src={image} alt="specifid_id_room" />
          </div>
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}>{roomDetails.title}</h2>
          <p className={classes.type}>
            Type: <span>{roomDetails.type}</span>
          </p>
          <div className={classes.review}>
            Review: <AiFillStar className={classes.icon} /> {roomDetails.review}{" "}
            (12)
          </div>
          <p className={classes.desc}>
            <span>Description : </span>
            {roomDetails.description}
          </p>
          <div className={classes.priceAndCountry}>
            <span>Country : {roomDetails.country}</span>
            <span>
              <span className={classes.price}>₹{roomDetails.price} </span>/ per
              person
            </span>
          </div>
          <form
            className={classes.typeDetailForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <h3 className={classes.subtitle}>Enter information here</h3>
            <input
              value={username}
              type="text"
              placeholder="Full name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              value={email}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ display: "flex", gap: "16px" }}>
              <input
                value={startDate}
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                value={endDate}
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button type="submit" className={classes.bookNow}>
              Book now
            </button>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Your date is in the booked range! Last booked day is {error}
            </div>
          )}
          {success && (
            <div className={classes.successMessage}>
              Success! You booked from {startDate} to {endDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeDetails;
