const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua matakuliah dengan JOIN ke tabel prodi
router.get("/", async (req, res) => {
  try {
    const matakuliah = await db("matakuliah")
      .join("prodi", "matakuliah.prodi_id", "prodi.id")
      .select(
        "matakuliah.id",
        "matakuliah.kode_matakuliah",
        "matakuliah.nama_matakuliah",
        "matakuliah.sks",
        "matakuliah.prodi_id",
        "prodi.nama as jurusan",
        "matakuliah.created_at",
        "matakuliah.updated_at"
      );

    res.json(matakuliah);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching matakuliah", error: err.message });
  }
});

// GET matakuliah by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const matakuliah = await db("matakuliah").where({ id }).first();
    if (!matakuliah) {
      return res.status(404).json({ message: "Matakuliah tidak ditemukan" });
    }
    res.json(matakuliah);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching matakuliah", error: err.message });
  }
});

// CREATE matakuliah
router.post("/", async (req, res) => {
  try {
    const { kode_matakuliah, nama_matakuliah, sks, prodi_id } = req.body;

    if (!kode_matakuliah || !nama_matakuliah || !sks || !prodi_id) {
      return res.status(400).json({
        message: "Kode, Nama, SKS, dan Prodi ID wajib diisi.",
      });
    }

    const [id] = await db("matakuliah").insert({
      kode_matakuliah,
      nama_matakuliah,
      sks,
      prodi_id,
    });

    const newMatakuliah = await db("matakuliah").where({ id }).first();
    res.status(201).json({
      message: "Matakuliah berhasil dibuat",
      matakuliah: newMatakuliah,
    });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY" || err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Kode matakuliah sudah digunakan." });
    }
    res
      .status(500)
      .json({ message: "Error creating matakuliah", error: err.message });
  }
});

// UPDATE matakuliah
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { kode_matakuliah, nama_matakuliah, sks, prodi_id } = req.body;

    if (!kode_matakuliah || !nama_matakuliah || !sks || !prodi_id) {
      return res.status(400).json({
        message: "Kode, Nama, SKS, dan Prodi ID wajib diisi.",
      });
    }

    const updated = await db("matakuliah").where({ id }).update({
      kode_matakuliah,
      nama_matakuliah,
      sks,
      prodi_id,
      updated_at: db.fn.now(),
    });

    if (updated === 0) {
      return res.status(404).json({ message: "Matakuliah tidak ditemukan" });
    }

    const updatedMatakuliah = await db("matakuliah").where({ id }).first();
    res.json({
      message: "Matakuliah berhasil diupdate",
      matakuliah: updatedMatakuliah,
    });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY" || err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Kode matakuliah sudah digunakan." });
    }
    res
      .status(500)
      .json({ message: "Error updating matakuliah", error: err.message });
  }
});

// DELETE matakuliah
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db("matakuliah").where({ id }).del();
    if (deleted === 0) {
      return res.status(404).json({ message: "Matakuliah tidak ditemukan" });
    }
    res.status(200).json({ message: "Matakuliah berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting matakuliah", error: err.message });
  }
});

module.exports = router;
