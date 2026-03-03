import authRoutes from "./routes/authRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import session from "express-session";
import express from "express";
import "dotenv/config";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //wht is it for?
  }),
);

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({ ok: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false, //??
    saveUninitialized: false, //??
    cookie: { secure: false }, //????
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/routine", routineRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
