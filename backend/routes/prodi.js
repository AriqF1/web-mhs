const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua prodi
router.get("/", async (req, res) => {
  try {
    const prodi = await db("prodi").select("*");
    res.json(prodi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
