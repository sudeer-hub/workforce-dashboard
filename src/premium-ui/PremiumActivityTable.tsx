
import { useEffect, useState } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  AlertCircle,
  LoaderCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Employee = {
  id: number;
  employee_code: string;
  name: string;
  email: string;
  department: string;
  location: string;
  status: string;
  join_date: string;
};

type EmployeeResponse = {
  data: Employee[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type PremiumActivityTableProps = {
  searchQuery?: string;
  selectedDepartment?: string;
  selectedLocation?: string;
  selectedStatus?: string;
};

export default function PremiumActivityTable({
  searchQuery = "",
  selectedDepartment = "All",
  selectedLocation = "All",
  selectedStatus = "All",
}: PremiumActivityTableProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page: String(page),
          limit: "5",
          search: searchQuery.trim(),
          sortBy,
          sortOrder,
        });

        if (selectedDepartment !== "All") {
          params.set("department", selectedDepartment);
        }

        if (selectedLocation !== "All") {
          params.set("location", selectedLocation);
        }

        if (selectedStatus !== "All") {
          params.set("status", selectedStatus);
        }

        const response = await fetch(
          `http://localhost:5000/api/employees?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employee records");
        }

        const result: EmployeeResponse = await response.json();

        if (isMounted) {
          setEmployees(result.data);
          setTotalPages(result.pagination.totalPages);
          setTotalRecords(result.pagination.total);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load employee records"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEmployees();

    return () => {
      isMounted = false;
    };
  }, [
    page,
    searchQuery,
    selectedDepartment,
    selectedLocation,
    selectedStatus,
    sortBy,
    sortOrder,
    retryCount,
  ]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder((current) =>
        current === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    setPage(1);
  };

  const getSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ArrowUpDown size={13} />;
    }

    return sortOrder === "asc" ? (
      <ArrowUp size={13} />
    ) : (
      <ArrowDown size={13} />
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <section
      className="premium-panel activity-panel"
      aria-labelledby="recent-activity-title"
      aria-busy={loading}
    >
      <div className="panel-heading">
        <div>
          <h3 id="recent-activity-title">Employee Records</h3>
          <p>Employee information from the SQLite database</p>
        </div>

        {!loading && !error && (
          <span className="activity-count">
            {totalRecords} employees
          </span>
        )}
      </div>

      {loading ? (
        <div className="activity-state" role="status">
          <LoaderCircle
            className="activity-state-icon activity-spinner"
            size={28}
          />
          <strong>Loading employee records...</strong>
          <p>Please wait while employee data is loaded.</p>
        </div>
      ) : error ? (
        <div className="activity-state" role="alert">
          <AlertCircle
            className="activity-state-icon activity-error-icon"
            size={28}
          />
          <strong>Unable to load employees</strong>
          <p>{error}</p>

          <button
            type="button"
            className="activity-retry-button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            <RefreshCw size={15} />
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="activity-table-wrap">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>EMPLOYEE</th>

                  <th>
                    <button
                      type="button"
                      className="table-sort-button"
                      onClick={() => handleSort("department")}
                    >
                      DEPARTMENT {getSortIcon("department")}
                    </button>
                  </th>

                  <th>
                    <button
                      type="button"
                      className="table-sort-button"
                      onClick={() => handleSort("location")}
                    >
                      LOCATION {getSortIcon("location")}
                    </button>
                  </th>

                  <th>EMPLOYEE ID</th>

                  <th>
                    <button
                      type="button"
                      className="table-sort-button"
                      onClick={() => handleSort("join_date")}
                    >
                      JOINED DATE {getSortIcon("join_date")}
                    </button>
                  </th>

                  <th>
                    <button
                      type="button"
                      className="table-sort-button"
                      onClick={() => handleSort("status")}
                    >
                      STATUS {getSortIcon("status")}
                    </button>
                  </th>

                  <th>MORE</th>
                </tr>
              </thead>

              <tbody>
                {employees.length > 0 ? (
                  employees.map((item) => {
                    const initials = item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    const statusClass = item.status
                      .toLowerCase()
                      .replace(/\s+/g, "-");

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="employee-cell">
                            <span className="employee-avatar">
                              {initials}
                            </span>
                            <span>{item.name}</span>
                          </div>
                        </td>

                        <td>{item.department || "—"}</td>
                        <td>{item.location}</td>
                        <td>{item.employee_code}</td>

                        <td>
                          <span className="activity-time">
                            {formatDate(item.join_date)}
                          </span>
                        </td>

                        <td>
                          <span className={`status-badge ${statusClass}`}>
                            <span className="status-indicator" />
                            {item.status}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="row-action-button"
                            aria-label={`More options for ${item.name}`}
                            title={item.email}
                            onClick={() =>
                              window.alert(
                                `${item.name}\nEmployee ID: ${item.employee_code}\nEmail: ${item.email}\nDepartment: ${item.department}\nLocation: ${item.location}\nStatus: ${item.status}`
                              )
                            }
                          >
                            <MoreHorizontal size={17} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <div className="activity-empty-state">
                        <strong>No employees found</strong>
                        <p>Try changing your search or filter selections.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="employee-pagination">
            <span>
              Showing {employees.length > 0 ? (page - 1) * 5 + 1 : 0}
              {" - "}
              {(page - 1) * 5 + employees.length}
              {" of "}
              {totalRecords} employees
            </span>

            <div className="pagination-actions">
              <button
                type="button"
                className="pagination-button"
                disabled={page <= 1}
                onClick={() => setPage((current) => current - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="pagination-page">
                {page} / {Math.max(totalPages, 1)}
              </span>

              <button
                type="button"
                className="pagination-button"
                disabled={page >= totalPages}
                onClick={() => setPage((current) => current + 1)}
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
