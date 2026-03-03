import express from "express";
import pool from "../db.js";
import { ArrowsUpFromLine } from "lucide-react";
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("hellow");
  const uid = req.session.user?.id;
  console.log(uid);
  if (!uid) return res.status(401).json({ message: "Not logged in" });

  const result = await pool.query(
    "SELECT * FROM routine_classes WHERE user_id=$1",
    [uid],
  );
  res.status(200).json({ rows: result.rows });
});

router.post("/addnew", async (req, res) => {
  const user_id = req.session.user?.id;
  if (!user_id) return res.status(401).json({ message: "Not logged in" });

  const {
    day,
    start_time,
    end_time,
    course_name,
    course_code,
    room,
    faculty_name,
    sec,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO routine_classes(user_id,day,start_time,end_time, course_name, course_code, room,faculty_name, sec) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        user_id,
        day,
        start_time,
        end_time,
        course_name,
        course_code,
        room,
        faculty_name,
        sec,
      ],
    );
    return res.status(201).json({ row: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add course" });
  }
});

router.post("/update", async (req, res) => {
  const user_id = req.session.user?.id;
  if (!user_id) return res.status(401).json({ message: "Not logged in" });

  const {
    id,
    day,
    start_time,
    end_time,
    course_name,
    course_code,
    room,
    faculty_name,
    sec,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE routine_classes
        SET day = $1, start_time = $2, end_time = $3, course_name = $4,
            course_code = $5, room = $6, faculty_name = $7, sec = $8
        WHERE id = $9 AND user_id = $10
        RETURNING *`,
      [
        day,
        start_time,
        end_time,
        course_name,
        course_code,
        room,
        faculty_name,
        sec,
        id,
        user_id,
      ],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "course no found" });
    }
    return res.status(201).json({ row: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update course" });
  }
});

router.delete("/:id", async (req, res) => {
  const user_id = req.session.user?.id;
  if (!user_id) return res.status(401).json({ message: "Not logged in" });
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM routine_classes WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, user_id],
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Course not found" });
    return res.status(200).json({ id: result.rows[0].id });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete course" });
  }
});

export default router;
