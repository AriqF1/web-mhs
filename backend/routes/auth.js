const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- Route Registrasi ---
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).send({ error: "Email sudah terdaftar." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultUserRole = await db("roles").where({ name: "user" }).first();
    if (!defaultUserRole) {
      return res.status(500).send({
        error: 'Role "user" tidak ditemukan di database. Mohon jalankan seeds.',
      });
    }

    const [userId] = await db("users").insert({
      email,
      password: hashedPassword,
      role_id: defaultUserRole.id,
    });

    const newUser = await db("users")
      .join("roles", "users.role_id", "=", "roles.id")
      .select("users.id", "users.email", "roles.name as role")
      .where("users.id", userId)
      .first();

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).send({
      message: "Registrasi berhasil!",
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error) {
    console.error("Kesalahan Registrasi:", error);
    res.status(500).send({ error: "Gagal mendaftar pengguna." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db("users").where({ email }).first();
    if (!user) {
      return res.status(400).send({ error: "Email atau password salah." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Email atau password salah." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userWithRole = await db("users")
      .join("roles", "users.role_id", "=", "roles.id")
      .select("users.id", "users.email", "roles.name as role")
      .where("users.id", user.id)
      .first();

    res.send({
      message: "Login berhasil!",
      user: {
        id: userWithRole.id,
        email: userWithRole.email,
        role: userWithRole.role,
      },
      token,
    });
  } catch (error) {
    console.error("Kesalahan Login:", error);
    res.status(500).send({ error: "Gagal login." });
  }
});

module.exports = router;
