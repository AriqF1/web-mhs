const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua dosen
router.get("/", (req, res) => {
  res.json(db.dosen);
});

module.exports = router;
