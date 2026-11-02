const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "workforce.db");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    department_id INTEGER,
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active',
    join_date TEXT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    attendance_date TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Present', 'Absent', 'On Leave')),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    UNIQUE(employee_id, attendance_date)
  );
`);

const departmentCount = db
  .prepare("SELECT COUNT(*) AS count FROM departments")
  .get().count;

if (departmentCount === 0) {
  const insertDepartment = db.prepare(
    "INSERT INTO departments (name) VALUES (?)"
  );

  ["IT", "HR", "Finance", "Marketing", "Operations"].forEach(
    (name) => insertDepartment.run(name)
  );
}

const employeeCount = db
  .prepare("SELECT COUNT(*) AS count FROM employees")
  .get().count;

if (employeeCount === 0) {
  const insertEmployee = db.prepare(`
    INSERT INTO employees
    (employee_code, name, email, department_id, location, status, join_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const employees = [
    ["EMP001", "Arun Kumar", "arun@example.com", 1, "Chennai", "Active", "2024-01-10"],
    ["EMP002", "Priya Sharma", "priya@example.com", 2, "Bangalore", "Active", "2024-02-15"],
    ["EMP003", "Rahul Kumar", "rahul@example.com", 3, "Chennai", "Active", "2024-03-20"],
    ["EMP004", "Divya S", "divya@example.com", 4, "Hyderabad", "Active", "2024-04-12"],
    ["EMP005", "Karthik R", "karthik@example.com", 5, "Bangalore", "Active", "2024-05-18"],
    ["EMP006", "Sneha M", "sneha@example.com", 1, "Chennai", "Inactive", "2023-08-10"],
    ["EMP007", "Vijay P", "vijay@example.com", 2, "Hyderabad", "Active", "2024-06-22"],
    ["EMP008", "Meena R", "meena@example.com", 3, "Chennai", "Active", "2024-07-05"]
  ];

  const insertMany = db.transaction((rows) => {
    rows.forEach((employee) => insertEmployee.run(...employee));
  });

  insertMany(employees);
}

const attendanceCount = db
  .prepare("SELECT COUNT(*) AS count FROM attendance")
  .get().count;

if (attendanceCount === 0) {
  const insertAttendance = db.prepare(`
    INSERT INTO attendance (employee_id, attendance_date, status)
    VALUES (?, ?, ?)
  `);

  const today = new Date().toISOString().slice(0, 10);

  const attendanceRecords = [
    [1, today, "Present"],
    [2, today, "Present"],
    [3, today, "Absent"],
    [4, today, "Present"],
    [5, today, "On Leave"],
    [6, today, "Present"],
    [7, today, "Present"],
    [8, today, "Absent"]
  ];

  const insertMany = db.transaction((rows) => {
    rows.forEach((record) => insertAttendance.run(...record));
  });

  insertMany(attendanceRecords);
}

module.exports = db;