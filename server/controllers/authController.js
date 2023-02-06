const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const { createToken } = require("../Services/userServices");

//register
const userRegister = async (req, res) => {
  try {
    const isExiting = await User.findOne({ email: req.body.email });

    if (isExiting) {
      return res.status(404).json({ message: "Email already taken" });
    }

    const hashedpasswrod = await bcrypt.hash(req.body.password, 10);

    // console.log(hashedpasswrod);

    const user = new User({ ...req.body, password: hashedpasswrod });

    const userRegisterd = await user.save();

    if (!userRegisterd) {
      return res.status(500).json({ message: "unable to register" });
    }

    //generating token
    const { password, ...others } = user._doc;

    const token = createToken(user);

    res.status(201).json({ others: others, token: token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//login
const userLogin = async (req, res) => {
  try {
    // const { email, password } = req.body;

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    //comparing password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const { password, ...others } = user._doc;

    const token = createToken(user);
    res.status(200).json({ others: others, token: token });


  } catch (error) {
    return res.send(500).json(error.message);
  }
};

module.exports = { userRegister, userLogin };
