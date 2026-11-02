const db = require("../config/database");

const employeeRepository = {
  getAll(filters = {}) {
    let sql = `
      SELECT
        e.id,
        e.employee_code,
        e.name,
        e.email,
        e.department_id,
        d.name AS department,
        e.location,
        e.status,
        e.join_date
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE 1 = 1
    `;

    const params = [];

    if (filters.search) {
      sql += " AND (e.name LIKE ? OR e.employee_code LIKE ? OR e.email LIKE ?)";
      const search = `%${filters.search}%`;
      params.push(search, search, search);
    }

    if (filters.department) {
      sql += " AND d.name = ?";
      params.push(filters.department);
    }

    if (filters.location) {
      sql += " AND e.location = ?";
      params.push(filters.location);
    }

    if (filters.status) {
      sql += " AND e.status = ?";
      params.push(filters.status);
    }

    const allowedSortColumns = {
      name: "e.name",
      department: "d.name",
      location: "e.location",
      status: "e.status",
      join_date: "e.join_date"
    };

    const sortColumn = allowedSortColumns[filters.sortBy] || "e.id";
    const sortOrder =
      filters.sortOrder === "desc" ? "DESC" : "ASC";

    sql += ` ORDER BY ${sortColumn} ${sortOrder}`;

    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 10));
    const offset = (page - 1) * limit;

    const countSql = `
      SELECT COUNT(*) AS total
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE 1 = 1
      ${filters.search ? "AND (e.name LIKE ? OR e.employee_code LIKE ? OR e.email LIKE ?)" : ""}
      ${filters.department ? "AND d.name = ?" : ""}
      ${filters.location ? "AND e.location = ?" : ""}
      ${filters.status ? "AND e.status = ?" : ""}
    `;

    const total = db.prepare(countSql).get(...params).total;

    sql += " LIMIT ? OFFSET ?";
    const data = db.prepare(sql).all(...params, limit, offset);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  getById(id) {
    return db.prepare(`
      SELECT e.*, d.name AS department
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE e.id = ?
    `).get(id);
  },

  getDepartments() {
    return db.prepare("SELECT * FROM departments ORDER BY name").all();
  }
};

module.exports = employeeRepository;