import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  const user = result.rows[0];
  if (!user) return res.status(401).json({ message: "Invalid Credentials" });
  const matched = await bcrypt.compare(password, user.password_hash);
  if (!matched) return res.status(401).json({ message: "Invalid Credentials" });

  // create session
  req.session.user = { id: user.id, email: user.email };

  return res.status(201).json({ user: req.session.user });
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users(email ,password_hash ) VALUES ($1,$2) RETURNING id,email",
      [email, hashedPassword],
    );
    return res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exits!" });
    }
    return res.status(500).json({ message: "Failed to signup" });
  }
});

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json({ user: req.session.user });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged Out" });
  });
});

export default router;
