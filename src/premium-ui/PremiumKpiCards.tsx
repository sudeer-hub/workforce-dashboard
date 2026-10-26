import {
  Users,
  UserCheck,
  CalendarCheck,
  CalendarDays,
  Clock3,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { workforceKpis } from "./premiumMockData";

type RangeType = "Default" | "Today" | "7D" | "30D" | "3M";

type PremiumKpiCardsProps = {
  activeRange: RangeType;
};

const iconMap = {
  users: Users,
  check: UserCheck,
  calendar: CalendarCheck,
  leave: CalendarDays,
  clock: Clock3,
};

const periodMetrics: Record<
  RangeType,
  Record<
    string,
    {
      title: string;
      value: string;
      change: string;
      note: string;
    }
  >
> = {
  Default: {
    check: {
      title: "Present Today",
      value: "1,086",
      change: "+4.6%",
      note: "vs yesterday",
    },
    calendar: {
      title: "Attendance Rate",
      value: "92.4%",
      change: "+2.3%",
      note: "vs last month",
    },
    leave: {
      title: "On Leave",
      value: "42",
      change: "-3.2%",
      note: "vs last month",
    },
    clock: {
      title: "Late Arrivals",
      value: "24",
      change: "-8.1%",
      note: "vs yesterday",
    },
  },

  Today: {
    check: {
      title: "Present Today",
      value: "1,086",
      change: "+4.6%",
      note: "vs yesterday",
    },
    calendar: {
      title: "Attendance Rate",
      value: "92.4%",
      change: "+2.3%",
      note: "vs yesterday",
    },
    leave: {
      title: "On Leave",
      value: "42",
      change: "-3.2%",
      note: "vs yesterday",
    },
    clock: {
      title: "Late Arrivals",
      value: "24",
      change: "-8.1%",
      note: "vs yesterday",
    },
  },

  "7D": {
    check: {
      title: "Avg. Present",
      value: "982",
      change: "+2.1%",
      note: "vs previous 7 days",
    },
    calendar: {
      title: "Attendance Rate",
      value: "90.8%",
      change: "+1.2%",
      note: "vs previous 7 days",
    },
    leave: {
      title: "Avg. On Leave",
      value: "46",
      change: "-4.2%",
      note: "vs previous 7 days",
    },
    clock: {
      title: "Late Arrivals",
      value: "31",
      change: "-6.0%",
      note: "vs previous 7 days",
    },
  },

  "30D": {
    check: {
      title: "Avg. Present",
      value: "968",
      change: "+3.4%",
      note: "vs previous 30 days",
    },
    calendar: {
      title: "Attendance Rate",
      value: "91.2%",
      change: "+1.8%",
      note: "vs previous 30 days",
    },
    leave: {
      title: "Avg. On Leave",
      value: "44",
      change: "-2.5%",
      note: "vs previous 30 days",
    },
    clock: {
      title: "Late Arrivals",
      value: "118",
      change: "-8.1%",
      note: "vs previous 30 days",
    },
  },

  "3M": {
    check: {
      title: "Avg. Present",
      value: "945",
      change: "+5.1%",
      note: "vs previous 3 months",
    },
    calendar: {
      title: "Attendance Rate",
      value: "89.7%",
      change: "+2.4%",
      note: "vs previous 3 months",
    },
    leave: {
      title: "Avg. On Leave",
      value: "48",
      change: "-1.6%",
      note: "vs previous 3 months",
    },
    clock: {
      title: "Late Arrivals",
      value: "342",
      change: "-7.4%",
      note: "vs previous 3 months",
    },
  },
};

export default function PremiumKpiCards({
  activeRange,
}: PremiumKpiCardsProps) {
  const selectedMetrics = periodMetrics[activeRange];

  return (
    <section
      className="premium-kpi-grid"
      aria-label="Workforce key metrics"
    >
      {workforceKpis.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];

        const metric = selectedMetrics[item.icon] ?? {
          title: item.title,
          value: item.value,
          change: item.change,
          note: item.note,
        };

        const isPositive = metric.change.startsWith("+");

        return (
          <article
            className="premium-kpi-card"
            key={item.title}
          >
            <div className="kpi-card-top">
              <div className={`kpi-icon ${item.color}`}>
                <Icon size={21} strokeWidth={1.8} />
              </div>

              <span
                className={`kpi-trend ${
                  isPositive ? "positive" : "negative"
                }`}
              >
                {isPositive ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {metric.change}
              </span>
            </div>

            <p className="kpi-title">{metric.title}</p>
            <h2 className="kpi-value">{metric.value}</h2>
            <p className="kpi-note">{metric.note}</p>
          </article>
        );
      })}
    </section>
  );
}