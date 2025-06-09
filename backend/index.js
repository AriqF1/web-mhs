const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dosenRoutes = require("./routes/dosen");
const prodiRoutes = require("./routes/prodi");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/dosen", dosenRoutes);
app.use("/api/prodi", prodiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
