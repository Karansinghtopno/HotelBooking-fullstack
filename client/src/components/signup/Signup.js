import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./signup.module.css";
import { useDispatch } from "react-redux";
import signupImg from "../../assets/img5.jpg";
import { register } from "../../redux/authSlice";
import { endpoint } from "../..";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${endpoint}/user/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify({ email, password, username }),
      });
      if (res.status !== 201) {
        setError(true);
        throw new Error("Register failed")
      }
      const data = await res.json();
      console.log(data);
      dispatch(register(data));
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className={classes.signUpContainer}>
      <div className={classes.signupWrapper}>
        <div className={classes.signupLeftSide}>
          <img src={signupImg} className={classes.leftImg} alt="signup" />
        </div>
        <div className={classes.signupRightSide}>
          <h2 className={classes.title}>Sign Up</h2>
          <form onSubmit={handleRegister} className={classes.signupForm}>
            <input
              type="text"
              placeholder="Type username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Type email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Type password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.submitBtn}>Sign Up</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credentials! Try different ones.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
