const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua dosen
router.get("/", async (req, res) => {
  try {
    const dosen = await db("dosen").select("*");
    res.json(dosen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
