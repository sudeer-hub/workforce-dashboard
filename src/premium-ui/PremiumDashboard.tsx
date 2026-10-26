
import { useMemo, useState } from "react";
import {
  Download,
  Moon,
  Sun,
  Plus,
  Layers3,
  RotateCcw,
} from "lucide-react";
import { MenuItem, TextField } from "@mui/material";

import PremiumSidebar from "./PremiumSidebar";
import PremiumTopbar from "./PremiumTopbar";
import PremiumKpiCards from "./PremiumKpiCards";
import PremiumAttendanceChart from "./PremiumAttendanceChart";
import PremiumDepartmentChart from "./PremiumDepartmentChart";
import PremiumWorkforceChart from "./PremiumWorkforceChart";
import PremiumActivityTable from "./PremiumActivityTable";

import {
  attendanceTrendByRange,
  departmentData,
  recentActivity,
} from "./premiumMockData";

type RangeType = "Default" | "Today" | "7D" | "30D" | "3M";

const timeRanges: RangeType[] = [
  "Default",
  "Today",
  "7D",
  "30D",
  "3M",
];

const pageDescriptions: Record<string, string> = {
  Overview: "Monitor workforce, attendance and employee performance.",
  Employees: "View employee activity and workforce information.",
  Attendance: "Review attendance trends and workforce attendance activity.",
  Analytics: "Explore workforce trends and department performance.",
  Departments: "Review employee distribution across departments.",
  Recruitment: "Workforce recruitment overview.",
  Learning: "Workforce learning overview.",
  Reports: "Review and export workforce analytics reports.",
  Settings: "Manage dashboard preferences.",
  "Help & Support": "Workforce dashboard help and support.",
};

const allDepartments = Array.from(
  new Set(recentActivity.map((item) => item.department)),
).sort();

const allLocations = Array.from(
  new Set(recentActivity.map((item) => item.location)),
).sort();

const allStatuses = Array.from(
  new Set(recentActivity.map((item) => item.status)),
).sort();

export default function PremiumDashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeRange, setActiveRange] =
    useState<RangeType>("Default");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const isOverview = activePage === "Overview";

  const pageTitle = !isOverview
    ? activePage
    : activeTab === "Dashboard"
      ? "Workforce Overview"
      : activeTab;

  const pageDescription =
    pageDescriptions[activePage] ??
    "Workforce analytics overview.";

  // Search and filters
  const filteredActivity = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return recentActivity.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.name,
          item.department,
          item.location,
          item.action,
          item.time,
          item.status,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(query),
        );

      const matchesDepartment =
        selectedDepartment === "All" ||
        item.department === selectedDepartment;

      const matchesLocation =
        selectedLocation === "All" ||
        item.location === selectedLocation;

      const matchesStatus =
        selectedStatus === "All" ||
        item.status === selectedStatus;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesStatus
      );
    });
  }, [
    searchQuery,
    selectedDepartment,
    selectedLocation,
    selectedStatus,
  ]);

  // Reset search and filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("All");
    setSelectedLocation("All");
    setSelectedStatus("All");
  };

  // Sidebar navigation
  const handlePageChange = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    resetFilters();
  };

  // Export report as CSV
  const handleExport = () => {
    const rows: (string | number)[][] = [
      ["WORKFORCE ANALYTICS REPORT"],
      ["Selected Period", activeRange],
      ["Selected Page", pageTitle],
      ["Department Filter", selectedDepartment],
      ["Location Filter", selectedLocation],
      ["Status Filter", selectedStatus],
      ["Search Query", searchQuery || "None"],
      ["Export Date", new Date().toLocaleDateString("en-IN")],
      [],
      ["ATTENDANCE TREND"],
      ["Day", "Present", "Absent"],
      ...attendanceTrendByRange[activeRange].map((item) => [
        item.day,
        item.present,
        item.absent,
      ]),
      [],
      ["DEPARTMENT DISTRIBUTION"],
      ["Department", "Employees"],
      ...departmentData.map((item) => [
        item.name,
        item.employees,
      ]),
      [],
      ["RECENT ACTIVITY"],
      [
        "Employee",
        "Department",
        "Location",
        "Action",
        "Time",
        "Status",
      ],
      ...filteredActivity.map((item) => [
        item.name,
        item.department,
        item.location,
        item.action,
        item.time,
        item.status,
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value ?? "").replace(/"/g, '""')}"`,
          )
          .join(","),
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `workforce-report-${activeRange.toLowerCase()}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className={`premium-app ${darkMode ? "dark-mode" : ""}`}>
      <div
        className={`sidebar-shell ${
          mobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <PremiumSidebar
          activePage={activePage}
          setActivePage={handlePageChange}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <main className="premium-main">
        <PremiumTopbar
          onMenuClick={() => setMobileMenuOpen(true)}
          activeRange={activeRange}
          onRangeChange={setActiveRange}
          onNavigate={handlePageChange}
          onSearch={setSearchQuery}
        />

        <div className="premium-content">
          <section className="reporting-heading">
            <div className="reporting-title">
              <span className="reporting-symbol">↗</span>
              <h1>
                {isOverview
                  ? "Reporting & Analytics"
                  : activePage}
              </h1>
            </div>

            <div className="reporting-tabs">
              <button
                type="button"
                className={`reporting-tab ${
                  activeTab === "Dashboard" ? "selected" : ""
                }`}
                onClick={() => {
                  setActivePage("Overview");
                  setActiveTab("Dashboard");
                  resetFilters();
                }}
                aria-pressed={activeTab === "Dashboard"}
              >
                Dashboard
              </button>

              <button
                type="button"
                className={`reporting-tab ${
                  activeTab === "Performance Dashboard"
                    ? "selected"
                    : ""
                }`}
                onClick={() => {
                  setActivePage("Overview");
                  setActiveTab("Performance Dashboard");
                }}
                aria-pressed={
                  activeTab === "Performance Dashboard"
                }
              >
                Performance Dashboard
              </button>

              <button
                type="button"
                className="reporting-icon-button"
                onClick={() => {
                  setActivePage("Overview");
                  setActiveTab("New Dashboard");
                }}
                aria-label="Add dashboard"
                title="Add dashboard"
              >
                <Plus size={18} />
              </button>

              <button
                type="button"
                className="reporting-icon-button"
                onClick={() => {
                  setActivePage("Overview");
                  setActiveTab("Dashboard Library");
                }}
                aria-label="Dashboard library"
                title="Dashboard library"
              >
                <Layers3 size={18} />
              </button>
            </div>

            <div className="reporting-range-row">
              <div
                className="reporting-range-pills"
                aria-label="Date range"
              >
                {timeRanges.map((range) => (
                  <button
                    type="button"
                    key={range}
                    className={`range-pill ${
                      activeRange === range ? "active" : ""
                    }`}
                    onClick={() => setActiveRange(range)}
                    aria-pressed={activeRange === range}
                  >
                    {range}
                  </button>
                ))}
              </div>

              <div className="reporting-actions">
                <button
                  type="button"
                  className="dashboard-export-button"
                  onClick={handleExport}
                  title="Download workforce report as CSV"
                >
                  <Download size={16} />
                  Export
                </button>

                <button
                  type="button"
                  className="theme-toggle"
                  onClick={() =>
                    setDarkMode((current) => !current)
                  }
                  aria-label={
                    darkMode
                      ? "Switch to light theme"
                      : "Switch to dark theme"
                  }
                  title={
                    darkMode
                      ? "Switch to light theme"
                      : "Switch to dark theme"
                  }
                >
                  {darkMode ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )}
                </button>
              </div>
            </div>
          </section>

          {isOverview ? (
            <>
              <PremiumKpiCards activeRange={activeRange} />

              <section className="dashboard-chart-grid">
                <PremiumAttendanceChart
                  activeRange={activeRange}
                />

                <PremiumDepartmentChart />

                <PremiumWorkforceChart
                  activeRange={activeRange}
                />
              </section>

              <section className="premium-panel activity-filter-panel">
                <div className="activity-filter-heading">
                  <div>
                    <h3>Filter Activity</h3>
                    <p>
                      Narrow down recent activity by department,
                      location and status.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="filter-reset-button"
                    onClick={resetFilters}
                    title="Reset all filters"
                  >
                    <RotateCcw size={15} />
                    Reset
                  </button>
                </div>

                <div className="activity-filters">
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Department"
                    value={selectedDepartment}
                    onChange={(event) =>
                      setSelectedDepartment(event.target.value)
                    }
                  >
                    <MenuItem value="All">
                      All Departments
                    </MenuItem>

                    {allDepartments.map((department) => (
                      <MenuItem
                        key={department}
                        value={department}
                      >
                        {department}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Location"
                    value={selectedLocation}
                    onChange={(event) =>
                      setSelectedLocation(event.target.value)
                    }
                  >
                    <MenuItem value="All">
                      All Locations
                    </MenuItem>

                    {allLocations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Status"
                    value={selectedStatus}
                    onChange={(event) =>
                      setSelectedStatus(event.target.value)
                    }
                  >
                    <MenuItem value="All">
                      All Statuses
                    </MenuItem>

                    {allStatuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </section>

              <PremiumActivityTable
                searchQuery={searchQuery}
                activities={filteredActivity}
              />
            </>
          ) : (
            <section className="premium-panel">
              <div className="panel-heading">
                <div>
                  <h3>{pageTitle}</h3>
                  <p>{pageDescription}</p>
                  <p>
                    Detailed {activePage.toLowerCase()} content
                    has not been implemented yet.
                  </p>
                </div>
              </div>
            </section>
          )}

          <footer className="premium-footer">
            <span>© 2026 Workforce Analytics</span>
            <span>
              {activeRange} · Workforce insights · Demo data
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
