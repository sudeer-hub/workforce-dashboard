
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { attendanceTrendByRange } from "./premiumMockData";

type RangeType = "Default" | "Today" | "7D" | "30D" | "3M";

type PremiumAttendanceChartProps = {
  activeRange: RangeType;
};

export default function PremiumAttendanceChart({
  activeRange,
}: PremiumAttendanceChartProps) {
  const attendanceTrend = attendanceTrendByRange[activeRange];

  const chartSubtitle =
    activeRange === "Today"
      ? "Attendance movement throughout today"
      : activeRange === "7D"
        ? "Daily attendance movement over 7 days"
        : activeRange === "30D"
          ? "Weekly attendance movement over 30 days"
          : activeRange === "3M"
            ? "Monthly attendance movement over 3 months"
            : "Daily attendance movement across the workforce";

  return (
    <section className="premium-panel attendance-panel">
      <div className="panel-heading">
        <div>
          <h3>Attendance Overview</h3>
          <p>{chartSubtitle}</p>
        </div>
      </div>

      <div className="attendance-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={attendanceTrend}
            margin={{ top: 16, right: 8, left: -18, bottom: 0 }}
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
                boxShadow: "0 8px 24px rgba(30, 41, 59, 0.08)",
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
