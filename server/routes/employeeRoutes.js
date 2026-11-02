const express = require("express");
const router = express.Router();

const employeeRepository = require("../repositories/employeeRepository");

router.get("/", (req, res) => {
  try {
    const result = employeeRepository.getAll(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

router.get("/departments", (req, res) => {
  try {
    res.json(employeeRepository.getDepartments());
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const employee = employeeRepository.getById(Number(req.params.id));

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee" });
  }
});

module.exports = router;