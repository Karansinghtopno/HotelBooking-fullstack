const express = require("express");
const router = express.Router();
const {uploadImage} = require("../controllers/uploadController")
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, res, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage: storage });



router.post("/image", verifyTokenAdmin, upload.single("image"), uploadImage)


module.exports = router;