
import { useState } from "react";
import {
  Search,
  Bell,
  CalendarDays,
  ChevronDown,
  Menu,
  CheckCheck,
  UserRound,
  Settings,
  CircleHelp,
  X,
} from "lucide-react";

type RangeType = "Default" | "Today" | "7D" | "30D" | "3M";

type PremiumTopbarProps = {
  onMenuClick?: () => void;
  activeRange: RangeType;
  onRangeChange: (range: RangeType) => void;
  onNavigate?: (page: string) => void;
  onSearch?: (query: string) => void;
};

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const rangeOptions: RangeType[] = [
  "Default",
  "Today",
  "7D",
  "30D",
  "3M",
];

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Late arrival alert",
    message: "A late check-in was recorded for Rahul Verma.",
    time: "Today · 09:42 AM",
    read: false,
  },
  {
    id: 2,
    title: "Leave request update",
    message: "Sneha Patel's leave request has been approved.",
    time: "Today · 09:48 AM",
    read: false,
  },
  {
    id: 3,
    title: "Workforce report",
    message: "Your attendance overview is ready to review.",
    time: "Today · 10:00 AM",
    read: true,
  },
];

export default function PremiumTopbar({
  onMenuClick,
  activeRange,
  onRangeChange,
  onNavigate,
  onSearch,
}: PremiumTopbarProps) {
  const [openPanel, setOpenPanel] = useState<
    "calendar" | "notifications" | "profile" | null
  >(null);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const togglePanel = (
    panel: "calendar" | "notifications" | "profile",
  ) => {
    setOpenPanel((current) =>
      current === panel ? null : panel,
    );
  };

  const markAllAsRead = () => {
    setNotifications((items) =>
      items.map((item) => ({
        ...item,
        read: true,
      })),
    );
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    );
  };

  const navigateTo = (page: string) => {
    onNavigate?.(page);
    setOpenPanel(null);
  };

  return (
    <header className="premium-topbar">
      <button
        type="button"
        className="mobile-menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={21} />
      </button>

      <div className="topbar-actions">
        <label className="topbar-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search dashboard"
            onChange={(event) =>
              onSearch?.(event.target.value)
            }
          />
        </label>

        <div className="topbar-popover-anchor">
          <button
            type="button"
            className={`topbar-icon-button ${
              openPanel === "calendar" ? "topbar-button-active" : ""
            }`}
            aria-label="Choose date range"
            aria-expanded={openPanel === "calendar"}
            onClick={() => togglePanel("calendar")}
          >
            <CalendarDays size={19} />
          </button>

          {openPanel === "calendar" && (
            <div className="topbar-popover calendar-popover">
              <div className="popover-heading">
                <div>
                  <h3>Date range</h3>
                  <p>Choose a reporting period</p>
                </div>

                <button
                  type="button"
                  className="popover-close"
                  aria-label="Close date range menu"
                  onClick={() => setOpenPanel(null)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="calendar-range-options">
                {rangeOptions.map((range) => (
                  <button
                    type="button"
                    key={range}
                    className={`calendar-range-option ${
                      activeRange === range ? "selected" : ""
                    }`}
                    onClick={() => {
                      onRangeChange(range);
                      setOpenPanel(null);
                    }}
                  >
                    <span>
                      {range === "Default"
                        ? "Default period"
                        : range === "Today"
                          ? "Today"
                          : range === "7D"
                            ? "Last 7 days"
                            : range === "30D"
                              ? "Last 30 days"
                              : "Last 3 months"}
                    </span>

                    {activeRange === range && (
                      <CheckCheck size={16} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="topbar-popover-anchor">
          <button
            type="button"
            className={`topbar-icon-button notification-button ${
              openPanel === "notifications" ? "topbar-button-active" : ""
            }`}
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={openPanel === "notifications"}
            onClick={() => togglePanel("notifications")}
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="notification-dot" />
            )}
          </button>

          {openPanel === "notifications" && (
            <div className="topbar-popover notifications-popover">
              <div className="popover-heading">
                <div>
                  <h3>Notifications</h3>
                  <p>
                    {unreadCount > 0
                      ? `${unreadCount} unread notifications`
                      : "You're all caught up"}
                  </p>
                </div>

                <button
                  type="button"
                  className="popover-close"
                  aria-label="Close notifications"
                  onClick={() => setOpenPanel(null)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="notification-list">
                {notifications.map((notification) => (
                  <button
                    type="button"
                    key={notification.id}
                    className={`notification-item ${
                      notification.read ? "is-read" : "is-unread"
                    }`}
                    onClick={() =>
                      markNotificationAsRead(notification.id)
                    }
                  >
                    <span className="notification-item-dot" />

                    <span className="notification-item-copy">
                      <strong>{notification.title}</strong>
                      <span>{notification.message}</span>
                      <small>{notification.time}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="notifications-footer">
                <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <CheckCheck size={15} />
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="topbar-popover-anchor">
          <button
            type="button"
            className={`topbar-profile ${
              openPanel === "profile" ? "topbar-profile-active" : ""
            }`}
            aria-expanded={openPanel === "profile"}
            aria-label="Open administrator profile menu"
            onClick={() => togglePanel("profile")}
          >
            <span className="profile-avatar">SK</span>

            <span className="profile-details">
              <strong>Sudeer Kumar</strong>
              <span>Administrator</span>
            </span>

            <ChevronDown
              size={16}
              className={`profile-chevron ${
                openPanel === "profile" ? "is-open" : ""
              }`}
            />
          </button>

          {openPanel === "profile" && (
            <div className="topbar-popover profile-popover">
              <div className="profile-menu-summary">
                <div className="profile-avatar profile-avatar-large">
                  SK
                </div>

                <div>
                  <strong>Sudeer Kumar</strong>
                  <span>Administrator</span>
                  <small>Stackly Workspace</small>
                </div>
              </div>

              <div className="profile-menu-divider" />

              <button
                type="button"
                className="profile-menu-item"
                onClick={() => navigateTo("Settings")}
              >
                <Settings size={17} />
                <span>Workspace settings</span>
              </button>

              <button
                type="button"
                className="profile-menu-item"
                onClick={() => navigateTo("Help & Support")}
              >
                <CircleHelp size={17} />
                <span>Help &amp; Support</span>
              </button>

              <div className="profile-menu-divider" />

              <div className="profile-menu-account">
                <UserRound size={16} />
                <span>Signed in as Administrator</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
