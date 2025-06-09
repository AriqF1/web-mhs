const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua dosen
router.get("/", async (req, res) => {
  try {
    const dosen = await db("dosen")
      .join("prodi", "dosen.prodi_id", "=", "prodi.id")
      .select(
        "dosen.id",
        "dosen.nama",
        "dosen.nip",
        "dosen.email",
        "dosen.status",
        "prodi.nama as prodi"
      );
    res.json(dosen);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { nama, nip, email, status, prodi_id } = req.body;
  try {
    const [id] = await db("dosen").insert({
      nama,
      nip,
      email,
      status,
      prodi_id,
    });
    res.status(201).json({ id, nama, nip, email, status, prodi_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, email, status, prodi_id } = req.body;
  try {
    await db("dosen").where({ id }).update({
      nama,
      email,
      status,
      prodi_id,
    });
    res.status(200).json({ nip, nama, email, status, prodi_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db("dosen").where({ id }).del();
    res.status(200).json({ message: "Dosen deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
