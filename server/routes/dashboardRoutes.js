const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/stats", (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().slice(0, 10);

    const total = db.prepare(`
      SELECT COUNT(*) AS count FROM employees WHERE status = 'Active'
    `).get().count;

    const attendance = db.prepare(`
      SELECT
        SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS present,
        SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END) AS absent,
        SUM(CASE WHEN a.status = 'On Leave' THEN 1 ELSE 0 END) AS onLeave
      FROM employees e
      LEFT JOIN attendance a
        ON e.id = a.employee_id AND a.attendance_date = ?
      WHERE e.status = 'Active'
    `).get(date);

    const present = attendance.present || 0;
    const absent = attendance.absent || 0;
    const onLeave = attendance.onLeave || 0;

    const attendanceRate =
      total > 0 ? Number(((present / total) * 100).toFixed(1)) : 0;

    res.json({
      date,
      totalEmployees: total,
      present,
      absent,
      onLeave,
      attendanceRate
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard statistics" });
  }
});

router.get("/department-distribution", (req, res) => {
  try {
    const data = db.prepare(`
      SELECT d.name AS department, COUNT(e.id) AS employees
      FROM departments d
      LEFT JOIN employees e
        ON d.id = e.department_id AND e.status = 'Active'
      GROUP BY d.id, d.name
      ORDER BY employees DESC
    `).all();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch department data" });
  }
});

router.get("/attendance", (req, res) => {
  try {
    const date = req.query.date || new Date().toISOString().slice(0, 10);

    const data = db.prepare(`
      SELECT
        a.attendance_date AS date,
        a.status,
        COUNT(*) AS count
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      WHERE a.attendance_date = ?
      GROUP BY a.attendance_date, a.status
    `).all(date);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance data" });
  }
});

module.exports = router;