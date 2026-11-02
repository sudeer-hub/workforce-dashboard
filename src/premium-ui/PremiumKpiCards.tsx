import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import { workforceKpis } from "./premiumMockData";

type DashboardStats = {
  totalEmployees: number;
  present: number;
  absent: number;
  onLeave: number;
  attendanceRate: number;
};

type PremiumKpiCardsProps = {
  stats: DashboardStats | null;
  loading: boolean;
  error: string;
};

const iconMap = {
  users: Users,
  present: UserCheck,
  absent: UserX,
  leave: CalendarDays,
  rate: TrendingUp,
};

export default function PremiumKpiCards({
  stats,
  loading,
  error,
}: PremiumKpiCardsProps) {
  const cards = [
    {
      key: "users",
      title: "Total Employees",
      value: stats?.totalEmployees,
      note: "Active employees",
    },
    {
      key: "present",
      title: "Present",
      value: stats?.present,
      note: "Present today",
    },
    {
      key: "absent",
      title: "Absent",
      value: stats?.absent,
      note: "Absent today",
    },
    {
      key: "leave",
      title: "On Leave",
      value: stats?.onLeave,
      note: "Employees on leave",
    },
    {
      key: "rate",
      title: "Attendance Rate",
      value:
        stats !== null
          ? `${stats.attendanceRate}%`
          : undefined,
      note: "Today's attendance",
    },
  ];

  return (
    <section
      className="premium-kpi-grid"
      aria-label="Workforce key metrics"
    >
      {cards.map((item) => {
        const Icon = iconMap[item.key as keyof typeof iconMap];

        const originalMetric = workforceKpis.find(
          (metric) => metric.icon === item.key ||
            (item.key === "present" && metric.icon === "check") ||
            (item.key === "rate" && metric.icon === "calendar") ||
            (item.key === "absent" && metric.icon === "clock"),
        );

        return (
          <article
            className="premium-kpi-card"
            key={item.key}
          >
            <div className="kpi-card-top">
              <div className={`kpi-icon ${originalMetric?.color ?? ""}`}>
                <Icon size={21} strokeWidth={1.8} />
              </div>

              <span className="kpi-trend positive">
                Live
              </span>
            </div>

            <p className="kpi-title">{item.title}</p>

            <h2 className="kpi-value">
              {loading ? "..." : error ? "—" : item.value ?? 0}
            </h2>

            <p className="kpi-note">
              {error ? "Unable to load data" : item.note}
            </p>
          </article>
        );
      })}
    </section>
  );
}