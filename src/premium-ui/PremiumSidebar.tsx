
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ChartNoAxesCombined,
  BriefcaseBusiness,
  Settings,
  HelpCircle,
  ChevronLeft,
  Building2,
  GraduationCap,
  ClipboardList,
} from "lucide-react";

type PremiumSidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Employees", icon: Users },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Analytics", icon: ChartNoAxesCombined },
  { label: "Departments", icon: Building2 },
  { label: "Recruitment", icon: BriefcaseBusiness },
  { label: "Learning", icon: GraduationCap },
  { label: "Reports", icon: ClipboardList },
];

export default function PremiumSidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
}: PremiumSidebarProps) {
  return (
    <aside className={`premium-sidebar premium-icon-sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <div className="sidebar-brand">
        <button
          className="brand-mark"
          onClick={() => setActivePage("Overview")}
          aria-label="Go to overview"
        >
          <ChartNoAxesCombined size={22} />
        </button>

        {!collapsed && (
          <div className="brand-copy">
            <strong>Stackly</strong>
            <span>WORKFORCE</span>
          </div>
        )}

        <button
          className="sidebar-collapse"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <nav className="sidebar-navigation" aria-label="Main navigation">
        {navigation.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={`sidebar-nav-item ${activePage === label ? "active" : ""}`}
            onClick={() => setActivePage(label)}
            title={collapsed ? label : undefined}
            aria-current={activePage === label ? "page" : undefined}
          >
            <Icon size={20} strokeWidth={1.8} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          className={`sidebar-nav-item ${activePage === "Help & Support" ? "active" : ""}`}
          onClick={() => setActivePage("Help & Support")}
          title={collapsed ? "Help & Support" : undefined}
        >
          <HelpCircle size={20} strokeWidth={1.8} />
          {!collapsed && <span>Help & Support</span>}
        </button>

        <button
          className={`sidebar-nav-item ${activePage === "Settings" ? "active" : ""}`}
          onClick={() => setActivePage("Settings")}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={20} strokeWidth={1.8} />
          {!collapsed && <span>Settings</span>}
        </button>

        <div className="sidebar-workspace">
          <div className="workspace-avatar">S</div>

          {!collapsed && (
            <div className="workspace-copy">
              <strong>Stackly Workspace</strong>
              <span>Workforce Analytics</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
