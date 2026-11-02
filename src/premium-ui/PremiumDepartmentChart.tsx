
import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DepartmentRecord = {
  department: string;
  employees: number;
};

export default function PremiumDepartmentChart() {
  const [departmentData, setDepartmentData] =
    useState<DepartmentRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDepartments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/dashboard/department-distribution"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch department data");
        }

        const data: DepartmentRecord[] = await response.json();

        if (isMounted) {
          setDepartmentData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load department data"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDepartments();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="premium-panel department-panel">
      <div className="panel-heading">
        <div>
          <h3>Department Distribution</h3>
          <p>Employee headcount by department</p>
        </div>
      </div>

      <div className="department-chart">
        {loading ? (
          <div className="chart-state">
            Loading department data...
          </div>
        ) : error ? (
          <div className="chart-state">
            {error}
          </div>
        ) : departmentData.length === 0 ? (
          <div className="chart-state">
            No department data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentData}
              layout="vertical"
              margin={{
                top: 8,
                right: 18,
                left: 8,
                bottom: 8,
              }}
            >
              <CartesianGrid
                stroke="var(--chart-grid, #DFE8EF)"
                strokeDasharray="4 5"
                horizontal={false}
              />

              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 11 }}
              />

              <YAxis
                type="category"
                dataKey="department"
                width={95}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#45536D", fontSize: 11 }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(18, 189, 183, 0.08)",
                }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #DCE8EB",
                  boxShadow:
                    "0 8px 24px rgba(30, 41, 59, 0.08)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,
                }}
              />

              <Bar
                dataKey="employees"
                name="Employees"
                fill="#12BDB7"
                radius={[0, 6, 6, 0]}
                barSize={18}
                animationDuration={700}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
