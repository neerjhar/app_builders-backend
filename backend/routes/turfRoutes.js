const express = require("express");
const router = express.Router();
const Turf = require("../models/Truf"); // ✅ fixed typo

// GET ALL TURFS
router.get("/", async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.json(turfs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SEARCH TURFS
router.get("/search", async (req, res) => {
  const query = req.query.q;
  try {
    const turfs = await Turf.find({
      $or: [
        { turfName: { $regex: query, $options: "i" } },
        { turfLocation: { $regex: query, $options: "i" } }
      ]
    });
    res.json(turfs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;