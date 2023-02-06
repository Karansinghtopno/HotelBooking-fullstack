const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // console.log("AUTH TOKEN USER", req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Not authorized No Token" });
  }
  if (req.headers.authorization.startsWith("Bearer ")) {
    //we get autherization like ="Bearer  7837dfgujhgjksghfjdkghfsjkg"
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
      //data is payload of jwt;
      if (error) {
        return res
          .status(403)
          .json({ message: "Wrong Token or Expierd Token" });
      } else {
        req.user = data;
        console.log(`req.user : `, req.user);
        // console.log(`data/payload :`, data);
        //an object with user.id and user.isAdmin
        next();
      }
    });
  }
};

const verifyTokenAdmin = async (req, res, next) => {
  console.log("AUTH TOKEN ADMIN", req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(403).json({
      message: " No authorizationn token is providde  No Token 1",
    });
  }

  if (req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      console.log(data);
      //data is payload of jwt;
      if (err) {
        console.log(err.message);
        return res
          .status(403)
          .json({ message: "Wrong Token or Expierd Token 2" });
      } else {
        if (!data.isAdmin) {
          return res.status(401).json({ message: "You are not Admin" });
        }
        // console.log(req.user)
        req.user = data;
        console.log(req.user);
        next();
      }
    });
  }
};

module.exports = { verifyToken, verifyTokenAdmin };
