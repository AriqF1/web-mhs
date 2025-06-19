const fs = require("fs");
const path = require("path");

const dbFolder = path.join(__dirname, "db");
const outputFile = path.join(__dirname, "db.json");

const files = fs.readdirSync(dbFolder).filter((f) => f.endsWith(".json"));

const combined = {};

files.forEach((file) => {
  const key = path.basename(file, ".json");
  const content = fs.readFileSync(path.join(dbFolder, file), "utf-8");
  combined[key] = JSON.parse(content);
});

fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2));

console.log("Berhasil generate db.json dari folder /db");
