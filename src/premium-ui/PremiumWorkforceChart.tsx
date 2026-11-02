
import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RangeType = "Default" | "Today" | "7D" | "30D" | "3M";

type WorkforceStatus = {
  name: string;
  value: number;
};

type PremiumWorkforceChartProps = {
  activeRange: RangeType;
};

const DONUT_COLORS = [
  "#12BDB7",
  "#75DAD4",
  "#F5B84B",
  "#E77988",
];

export default function PremiumWorkforceChart({
  activeRange,
}: PremiumWorkforceChartProps) {
  const [distribution, setDistribution] =
    useState<WorkforceStatus[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchWorkforceData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/dashboard/stats"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workforce data");
        }

        const stats = await response.json();

        const data: WorkforceStatus[] = [
          { name: "Present", value: stats.present },
          { name: "On Leave", value: stats.onLeave },
          { name: "Absent", value: stats.absent },
        ];

        if (isMounted) {
          setDistribution(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load workforce data"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWorkforceData();

    return () => {
      isMounted = false;
    };
  }, [activeRange]);

  const totalEmployees = distribution.reduce(
    (total, item) => total + item.value,
    0
  );

  const rangeDescription =
    activeRange === "Today"
      ? "Workforce status for today"
      : "Current workforce status from SQLite database";

  return (
    <section className="premium-panel workforce-panel">
      <div className="panel-heading">
        <div>
          <h3>Workforce Overview</h3>
          <p>{rangeDescription}</p>
        </div>
      </div>

      <div className="workforce-chart">
        {loading ? (
          <div className="chart-state">
            Loading workforce data...
          </div>
        ) : error ? (
          <div className="chart-state">
            {error}
          </div>
        ) : distribution.length === 0 || totalEmployees === 0 ? (
          <div className="chart-state">
            No workforce data available.
          </div>
        ) : (
          <>
            <div className="donut-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="67%"
                    outerRadius="88%"
                    paddingAngle={3}
                    stroke="none"
                    animationDuration={700}
                  >
                    {distribution.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={
                          DONUT_COLORS[
                            index % DONUT_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #DCE8EB",
                      boxShadow:
                        "0 8px 24px rgba(30, 41, 59, 0.08)",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center">
                <strong>
                  {totalEmployees.toLocaleString("en-IN")}
                </strong>
                <span>Employees</span>
              </div>
            </div>

            <div className="workforce-legend">
              {distribution.map((item, index) => (
                <div
                  className="workforce-legend-row"
                  key={item.name}
                >
                  <span
                    className="legend-dot"
                    style={{
                      backgroundColor:
                        DONUT_COLORS[
                          index % DONUT_COLORS.length
                        ],
                    }}
                  />

                  <span className="workforce-legend-label">
                    {item.name}
                  </span>

                  <strong>
                    {item.value.toLocaleString("en-IN")}
                  </strong>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
