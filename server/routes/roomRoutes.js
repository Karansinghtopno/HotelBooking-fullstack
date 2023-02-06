const express = require("express");
const router = express.Router();

//importing controller 
const {
  getAllRooms,
  getOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  bookRoom,typeRoom
  
} = require("../controllers/roomController");
// const Room = require("../models/Room");

//middlewares
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");

//routes

//get all room
router.get("/all", getAllRooms);

// find types
router.get("/find/types", typeRoom)

//get one roomm
router.get("/find/:id", verifyToken, getOneRoom);

//create
router.post("/", verifyTokenAdmin, createRoom);

//update
router.put("/:id", verifyTokenAdmin, updateRoom);

//delete
router.delete("/:id",verifyTokenAdmin, deleteRoom)

router.put("/bookroom/:id",verifyToken, bookRoom)
//book

module.exports = router;
