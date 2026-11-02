
import { useEffect, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RangeType = "Default" | "Today" | "7D" | "30D" | "3M";

type PremiumAttendanceChartProps = {
  activeRange: RangeType;
};

type AttendanceRecord = {
  date: string;
  status: "Present" | "Absent" | "On Leave";
  count: number;
};

type ChartData = {
  day: string;
  present: number;
  absent: number;
};

export default function PremiumAttendanceChart({
  activeRange,
}: PremiumAttendanceChartProps) {
  const [attendanceTrend, setAttendanceTrend] =
    useState<ChartData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/dashboard/attendance"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }

        const records: AttendanceRecord[] =
          await response.json();

        const present = records.find(
          (item) => item.status === "Present"
        )?.count ?? 0;

        const absent = records.find(
          (item) => item.status === "Absent"
        )?.count ?? 0;

        const chartData: ChartData[] = [
          {
            day: "Today",
            present,
            absent,
          },
        ];

        if (isMounted) {
          setAttendanceTrend(chartData);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load attendance data"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAttendance();

    return () => {
      isMounted = false;
    };
  }, [activeRange]);

  const chartSubtitle = loading
    ? "Loading attendance data..."
    : activeRange === "Today"
      ? "Today's attendance summary"
      : "Current attendance data from SQLite database";

  return (
    <section className="premium-panel attendance-panel">
      <div className="panel-heading">
        <div>
          <h3>Attendance Overview</h3>
          <p>{chartSubtitle}</p>
        </div>
      </div>

      <div className="attendance-chart">
        {loading ? (
          <div className="chart-state">
            Loading attendance data...
          </div>
        ) : error ? (
          <div className="chart-state">
            {error}
          </div>
        ) : attendanceTrend.length === 0 ? (
          <div className="chart-state">
            No attendance data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={attendanceTrend}
              margin={{
                top: 16,
                right: 8,
                left: -18,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="presentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#12BDB7"
                    stopOpacity={0.24}
                  />
                  <stop
                    offset="95%"
                    stopColor="#12BDB7"
                    stopOpacity={0.015}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="var(--chart-grid, #DFE8EF)"
                strokeDasharray="4 5"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 11 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 11 }}
                width={42}
              />

              <Tooltip
                cursor={{
                  stroke: "#A9DCD9",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #DCE8EB",
                  boxShadow:
                    "0 8px 24px rgba(30, 41, 59, 0.08)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,
                  color: "#20283B",
                  background: "#FFFFFF",
                }}
              />

              <Area
                type="monotone"
                dataKey="present"
                name="Present"
                stroke="#12BDB7"
                strokeWidth={3}
                fill="url(#presentGradient)"
                activeDot={{
                  r: 5,
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  fill: "#12BDB7",
                }}
                animationDuration={700}
              />

              <Area
                type="monotone"
                dataKey="absent"
                name="Absent"
                stroke="#75DAD4"
                strokeWidth={2}
                fill="transparent"
                activeDot={{
                  r: 4,
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  fill: "#75DAD4",
                }}
                animationDuration={700}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="chart-legend">
        <span>
          <i className="legend-dot teal-dot" />
          Present
        </span>
        <span>
          <i className="legend-dot indigo-dot" />
          Absent
        </span>
      </div>
    </section>
  );
}
