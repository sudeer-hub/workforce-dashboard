
# Workforce Analytics Dashboard

A responsive workforce analytics dashboard built using React, TypeScript, Vite, and Recharts. It provides a visual overview of workforce KPIs, attendance trends, department distribution, workforce status, and recent employee activity.

## Features

- Responsive dashboard layout with sidebar and top navigation
- Workforce KPI cards
- Attendance trend chart with date-range selection
- Department employee distribution chart
- Workforce status donut chart
- Recent employee activity section
- Search functionality
- Date-range filters: Default, Today, 7D, 30D, and 3M
- Light and dark theme toggle
- CSV report export
- Responsive layout for desktop and mobile
- Mock data for demonstration

## Tech Stack

- React
- TypeScript
- Vite
- Recharts
- Lucide React
- CSS

> Note: Material UI is not listed here because its usage in the current project has not yet been verified.

## Prerequisites

- Node.js
- npm

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal.

### 3. Create a production build

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

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
├── package.json
└── README.md
```

## Testing

### Production build

Command:

```bash
npm run build
```

Result: Successful. TypeScript compilation and Vite production build completed.

### Browser checks

- Dashboard renders in the browser.
- Date-range controls were tested.
- CSV export was tested.
- Theme toggle was tested.
- Responsive layout was inspected at mobile viewport sizes.

### Known limitation

The production build reports a warning because the minified JavaScript bundle exceeds 500 kB. The build still completes successfully. Code splitting or lazy loading can be considered as a future optimization.

## Data

This project currently uses mock workforce data for demonstration. It is not connected to a live HR database or backend API.

## Future Improvements

- Connect to a real workforce data API
- Add loading, empty, and error states where needed
- Verify department, location, and status filters
- Improve production bundle splitting
- Add automated tests

## License

This project is intended for demonstration and development purposes.
