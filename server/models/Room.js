const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    country: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    unavailableDates: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
