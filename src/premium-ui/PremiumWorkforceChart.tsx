
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { workforceDistribution } from "./premiumMockData";

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

const workforceDistributionByRange: Record<
  RangeType,
  WorkforceStatus[]
> = {
  Default: workforceDistribution,
  Today: [
    { name: "Present", value: 1086 },
    { name: "On Leave", value: 42 },
    { name: "Absent", value: 96 },
    { name: "Remote", value: 24 },
  ],
  "7D": [
    { name: "Present", value: 982 },
    { name: "On Leave", value: 46 },
    { name: "Absent", value: 178 },
    { name: "Remote", value: 42 },
  ],
  "30D": [
    { name: "Present", value: 968 },
    { name: "On Leave", value: 44 },
    { name: "Absent", value: 190 },
    { name: "Remote", value: 46 },
  ],
  "3M": [
    { name: "Present", value: 945 },
    { name: "On Leave", value: 48 },
    { name: "Absent", value: 205 },
    { name: "Remote", value: 50 },
  ],
};

const rangeDescription: Record<RangeType, string> = {
  Default: "Today's workforce status",
  Today: "Workforce status for today",
  "7D": "Workforce status over 7 days",
  "30D": "Workforce status over 30 days",
  "3M": "Workforce status over 3 months",
};

export default function PremiumWorkforceChart({
  activeRange,
}: PremiumWorkforceChartProps) {
  const selectedDistribution =
    workforceDistributionByRange[activeRange];

  const totalEmployees = selectedDistribution.reduce(
    (total, item) => total + item.value,
    0,
  );

  return (
    <section className="premium-panel workforce-panel">
      <div className="panel-heading">
        <div>
          <h3>Workforce Overview</h3>
          <p>{rangeDescription[activeRange]}</p>
        </div>
      </div>

      <div className="workforce-chart">
        <div className="donut-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={selectedDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius="67%"
                outerRadius="88%"
                paddingAngle={3}
                stroke="none"
                animationDuration={700}
              >
                {selectedDistribution.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #DCE8EB",
                  boxShadow: "0 8px 24px rgba(30, 41, 59, 0.08)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center">
            <strong>{totalEmployees.toLocaleString("en-IN")}</strong>
            <span>Employees</span>
          </div>
        </div>

        <div className="workforce-legend">
          {selectedDistribution.map((item, index) => (
            <div className="workforce-legend-row" key={item.name}>
              <span
                className="legend-dot"
                style={{
                  backgroundColor:
                    DONUT_COLORS[index % DONUT_COLORS.length],
                }}
              />

              <span className="workforce-legend-label">
                {item.name}
              </span>

              <strong>{item.value.toLocaleString("en-IN")}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
