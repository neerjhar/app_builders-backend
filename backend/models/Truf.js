const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({

  turfName: {
    type: String,
    required: true
  },

  turfLocation: {
    type: String,
    required: true
  },

  googleMapsLink: {
    type: String
  },

  turfReview: {
    type: Number
  },

  turfStatus: {
    type: String
  },

  turfHours: {
    type: String
  },

  turfFees: {
    type: String
  }

});

module.exports = mongoose.model("Turf", turfSchema, "turffdata");