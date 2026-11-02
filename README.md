# Workforce Analytics Dashboard

A responsive workforce analytics platform built using React, TypeScript, Vite, Node.js, Express, SQLite, and Recharts. The application provides workforce KPIs, attendance analytics, department distribution, employee records, search, filtering, sorting, and pagination.

## Features

### Dashboard UI
- Responsive dashboard with sidebar and top navigation
- Workforce KPI cards
- Attendance overview chart
- Department distribution chart
- Workforce status donut chart
- Light and dark theme
- CSV report export
- Desktop, tablet, and mobile layouts

### Workforce Management
- Employee records from SQLite database
- Employee search functionality
- Department filter
- Location filter
- Employee status filter
- Column sorting
- Server-side pagination
- Loading, error, and empty states

### Analytics
- Total employees
- Present employees
- Absent employees
- Employees on leave
- Attendance rate
- Department-wise employee distribution

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Material UI
- Recharts
- Lucide React
- CSS

### Backend
- Node.js
- Express.js
- REST API
- SQLite
- better-sqlite3
- Repository Pattern

## Project Architecture

The application follows a modular frontend and backend architecture.

- **Presentation Layer:** React components handle dashboard UI and user interactions.
- **API Layer:** Express REST endpoints provide dashboard and employee data.
- **Repository Layer:** Handles employee database queries and filtering.
- **Database Layer:** SQLite stores employee, department, and attendance records.

## Project Structure

```text
workforce-dashboard/
├── public/
├── src/
│   ├── premium-ui/
│   │   ├── PremiumActivityTable.tsx
│   │   ├── PremiumAttendanceChart.tsx
│   │   ├── PremiumDashboard.css
│   │   ├── PremiumDashboard.tsx
│   │   ├── PremiumDepartmentChart.tsx
│   │   ├── PremiumKpiCards.tsx
│   │   ├── PremiumSidebar.tsx
│   │   ├── PremiumTopbar.tsx
│   │   ├── PremiumWorkforceChart.tsx
│   │   └── premiumMockData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── server/
│   ├── config/
│   │   ├── database.js
│   │   └── workforce.db
│   ├── repositories/
│   │   └── employeeRepository.js
│   ├── routes/
│   │   ├── dashboardRoutes.js
│   │   └── employeeRoutes.js
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## Prerequisites

- Node.js
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sudeer-hub/workforce-dashboard.git
cd workforce-dashboard
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Start the backend server

```bash
npm run dev
```

Backend API runs at:

```text
http://localhost:5000
```

### 5. Start the frontend

Open a second terminal in the project root directory.

```bash
npm run dev
```

Open the local Vite URL displayed in the terminal.

## Database

SQLite is used as the database.

The database is automatically initialized when the backend starts.

### Database Tables

**1. Employees**
- id
- employee_code
- name
- email
- department_id
- location
- status
- join_date

**2. Departments**
- id
- name

**3. Attendance**
- id
- employee_id
- attendance_date
- status

Foreign key relationships connect employees with departments and attendance records.

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend health check |
| GET | `/api/dashboard/stats` | Workforce KPI statistics |
| GET | `/api/dashboard/attendance` | Attendance information |
| GET | `/api/dashboard/department-distribution` | Department distribution |
| GET | `/api/employees` | Employee records |
| GET | `/api/employees/departments` | Department list |
| GET | `/api/employees/:id` | Employee details |

### Employee API Query Parameters

The employee endpoint supports:

- `search` – Search employee records
- `department` – Filter by department
- `location` – Filter by location
- `status` – Filter by employee status
- `sortBy` – Sort employee records
- `sortOrder` – Ascending or descending order
- `page` – Pagination page number
- `limit` – Records per page

Example:

```text
http://localhost:5000/api/employees?page=1&limit=5
```

Example with filters:

```text
http://localhost:5000/api/employees?department=HR&location=Chennai&status=Active
```

## Production Build

From the project root:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing

### Backend
- Verified Express server startup.
- Verified SQLite database initialization.
- Tested dashboard statistics API.
- Tested department distribution API.
- Tested employee records API.

### Frontend
- Verified dashboard rendering.
- Verified KPI data integration.
- Verified attendance and department chart integration.
- Verified workforce status chart integration.
- Tested employee search and filters.
- Tested sorting and pagination.
- Tested theme toggle and CSV export.
- Verified production build.

## Current Data Scope

The application uses SQLite with initial demonstration employee and attendance records.

Dashboard KPI values and the employee records table are retrieved through backend APIs.

Attendance analytics currently use the available attendance records. Historical date-range analytics require additional historical attendance data.

Some report and demonstration elements may still use frontend sample data.

## Known Limitations

- Initial database records are demonstration data.
- Historical attendance analytics are not yet fully implemented.
- Authentication and role-based access control are not implemented.
- Production deployment configuration is not included.
- The production build reports a large JavaScript bundle warning, although the build completes successfully.

## Future Improvements

- Add employee creation, editing, and deletion.
- Implement historical attendance analytics.
- Add authentication and authorization.
- Add automated API and frontend tests.
- Improve production bundle optimization.
- Deploy the frontend and backend.

## License

This project is intended for demonstration and development purposes.