
import { useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  AlertCircle,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import { recentActivity } from "./premiumMockData";

type Activity = (typeof recentActivity)[number];

type PremiumActivityTableProps = {
  searchQuery?: string;
  activities?: Activity[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

export default function PremiumActivityTable({
  searchQuery = "",
  activities,
  isLoading = false,
  error = null,
  onRetry,
}: PremiumActivityTableProps) {
  const filteredActivity = useMemo(() => {
    const source = activities ?? recentActivity;
    const query = searchQuery.trim().toLowerCase();

    if (!query) return source;

    return source.filter((item) =>
      [
        item.name,
        item.department,
        item.location,
        item.action,
        item.time,
        item.status,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query),
      ),
    );
  }, [searchQuery, activities]);

  return (
    <section
      className="premium-panel activity-panel"
      aria-labelledby="recent-activity-title"
      aria-busy={isLoading}
    >
      <div className="panel-heading">
        <div>
          <h3 id="recent-activity-title">Recent Activity</h3>
          <p>Latest workforce activity and attendance updates</p>
        </div>

        {!isLoading && !error && (
          <span className="activity-count">
            {filteredActivity.length} records
          </span>
        )}
      </div>

      {isLoading ? (
        <div
          className="activity-state"
          role="status"
          aria-live="polite"
        >
          <LoaderCircle className="activity-state-icon activity-spinner" size={28} />
          <strong>Loading activity...</strong>
          <p>Please wait while activity records are loaded.</p>
        </div>
      ) : error ? (
        <div className="activity-state" role="alert">
          <AlertCircle
            className="activity-state-icon activity-error-icon"
            size={28}
          />
          <strong>Unable to load activity</strong>
          <p>{error}</p>

          {onRetry && (
            <button
              type="button"
              className="activity-retry-button"
              onClick={onRetry}
            >
              <RefreshCw size={15} />
              Try again
            </button>
          )}
        </div>
      ) : (
        <div className="activity-table-wrap">
          <table className="activity-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>LOCATION</th>
                <th>ACTION</th>
                <th>TIME</th>
                <th>STATUS</th>
                <th>MORE</th>
              </tr>
            </thead>

            <tbody>
              {filteredActivity.length > 0 ? (
                filteredActivity.map((item, index) => {
                  const initials = item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  const statusClass = String(item.status)
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  return (
                    <tr
                      key={`${item.name}-${item.time}-${index}`}
                    >
                      <td>
                        <div className="employee-cell">
                          <span className="employee-avatar">
                            {initials}
                          </span>
                          <span>{item.name}</span>
                        </div>
                      </td>

                      <td>{item.department}</td>
                      <td>{item.location}</td>

                      <td>
                        <span className="activity-action">
                          {String(item.action)
                            .toLowerCase()
                            .includes("late") ? (
                            <ArrowDownRight size={15} />
                          ) : (
                            <ArrowUpRight size={15} />
                          )}
                          {item.action}
                        </span>
                      </td>

                      <td>
                        <span className="activity-time">
                          {item.time}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${statusClass}`}
                        >
                          <span className="status-indicator" />
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="row-action-button"
                          aria-label={`More options for ${item.name}`}
                          title={item.name}
                          onClick={() =>
                            window.alert(
                              `${item.name}\nDepartment: ${item.department}\nLocation: ${item.location}\nStatus: ${item.status}`,
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
                      <strong>No matching activity found</strong>
                      <p>
                        Try changing your search or filter selections.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
