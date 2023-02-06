const jwt = require("jsonwebtoken");

const createToken = (user) => {
  console.log(`userToken`);
  console.log(user._id);
  const payload = {
    id: user._id.toString(),
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });

  return token;
};

module.exports = { createToken };
