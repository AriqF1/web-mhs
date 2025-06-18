const jwt = require("jsonwebtoken");
const db = require("../db");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Authentication token missing.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db("users")
      .join("roles", "users.role_id", "=", "roles.id")
      .select("users.id", "users.email", "roles.name as role")
      .where("users.id", decoded.userId)
      .first();

    if (!user) {
      throw new Error("User not found.");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
