const Room = require("../models/Room");

const getAllRooms = async (req, res) => {
  try {
    // const type = req.query.type
    // console.log(req.query);
    // console.log(req.params);
    const { type } = req.query;
    console.log(type);
    let rooms;
    if (type) {
      rooms = await Room.find({ type: type }).limit(20);
    } else {
      rooms = await Room.find({}).limit(20);
    }

    return res.status(200).json({ rooms: rooms });
  } catch (error) {
    console.log(error.message);
  }
};

const getOneRoom = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "invalid Id" });
    }
    return res.status(200).json({ room: room });
  } catch (error) {
    console.log(error.message);
  }
};

const createRoom = async (req, res) => {
  try {
    // console.log(req.body);
    const createdRoom = await Room.create(req.body);
    return res.status(200).json(createdRoom);
  } catch (error) {
    console.log(error.message);
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedRoom);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletededRoom = await Room.findByIdAndDelete(id);

    return res.status(200).json(deletededRoom);
  } catch (error) {
    console.log(error.message);
  }
};

const bookRoom = async (req, res) => {
  try {
    const { unavailableDates } = req.body;
    const room = await Room.findById(req.params.id);

    room.unavailableDates = room.unavailableDates.concat(unavailableDates);

    await room.save();

    return res.status(200).json(room);
  } catch (error) {
    console.log(error.message);
  }
};

const typeRoom = async (req, res) => {
  try {
    const apartment = await Room.find({ type: "apartment" }).countDocuments();
    const villa = await Room.find({ type: "villa" }).countDocuments();
    const penthouse = await Room.find({ type: "penthouse" }).countDocuments();
    const bungalow = await Room.find({ type: "bungalow" }).countDocuments();

    return res.status(200).json({ apartment, villa, penthouse, bungalow });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllRooms,
  getOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  bookRoom,
  typeRoom,
};
