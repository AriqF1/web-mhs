const express = require("express");
const router = express.Router();
const db = require("../knexfile");

// GET semua dosen
router.get("/", (req, res) => {
  db.query("SELECT * FROM dosen", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
