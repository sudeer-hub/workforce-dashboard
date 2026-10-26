
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { departmentData } from "./premiumMockData";

export default function PremiumDepartmentChart() {
  return (
    <section className="premium-panel department-panel">
      <div className="panel-heading">
        <div>
          <h3>Department Distribution</h3>
          <p>Employee headcount by department</p>
        </div>
      </div>

      <div className="department-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentData}
            layout="vertical"
            margin={{ top: 8, right: 18, left: 8, bottom: 8 }}
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
              dataKey="name"
              width={95}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#45536D", fontSize: 11 }}
            />

            <Tooltip
              cursor={{ fill: "rgba(18, 189, 183, 0.08)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #DCE8EB",
                boxShadow: "0 8px 24px rgba(30, 41, 59, 0.08)",
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
      </div>
    </section>
  );
}
