const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors")
const useRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes")
// const uploadRoutes= require("./routes/uploadRoutes")
const uploadController = require("./controllers/uploadController")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'))

mongoose.set("strictQuery", false);
const PORT = process.env.port || 8000;
//connected to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("failed to connect the database");
  });

// app.get("/", (req, res) => {
//   res.send("hello from server");
// });

app.use("/user", useRoutes);

app.use("/room", roomRoutes )

app.use("/upload", uploadController)

//listen to server

app.listen(PORT, () => {
  console.log(`listning on PORT ${PORT}`);
});
