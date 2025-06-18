const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

// --- Import Routes ---
const dosenRoutes = require("./routes/dosen");
const prodiRoutes = require("./routes/prodi");
const matkulRoutes = require("./routes/matkul");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/dosen", dosenRoutes);
app.use("/api/prodi", prodiRoutes);
app.use("/api/matkul", matkulRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/protected-data", authMiddleware, (req, res) => {
  res.status(200).json({
    message: `Ini data rahasia untuk ${req.user.email} dengan role ${req.user.role}.`,
    user: req.user,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ada yang salah di server!");
});

// --- Menjalankan Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for origin: ${corsOptions.origin}`);
});
