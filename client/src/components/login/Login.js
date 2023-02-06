import React, { useState } from "react";
import classes from "./login.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import loginImage from "../../assets/img7.jpg";
import { endpoint } from "../..";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${endpoint}/user/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 404) {
        throw new Error("Wrong credentials");
      }
      const data = await res.json();
      console.log(data);
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeftSide}>
          <img src={loginImage} alt="loginImage" className={classes.leftImg} />
        </div>
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Login</h2>
          <form className={classes.loginForm} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Type email...."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Type password...."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.submitBtn}>Login</button>
            <p> Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong Credentials! Try different ones
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
