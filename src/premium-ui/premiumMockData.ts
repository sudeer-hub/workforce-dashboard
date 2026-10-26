
export const workforceKpis = [
  {
    title: "Total Employees",
    value: "1,248",
    change: "+12.8%",
    note: "vs last month",
    icon: "users",
    color: "indigo",
  },
  {
    title: "Present Today",
    value: "1,086",
    change: "+4.6%",
    note: "vs yesterday",
    icon: "check",
    color: "teal",
  },
  {
    title: "Attendance Rate",
    value: "92.4%",
    change: "+2.3%",
    note: "vs last month",
    icon: "calendar",
    color: "blue",
  },
  {
    title: "On Leave",
    value: "42",
    change: "-3.2%",
    note: "vs last month",
    icon: "leave",
    color: "orange",
  },
  {
    title: "Late Arrivals",
    value: "24",
    change: "-8.1%",
    note: "vs yesterday",
    icon: "clock",
    color: "rose",
  },
];

export const attendanceTrendByRange = {
  Default: [
    { day: "Mon", present: 940, absent: 85 },
    { day: "Tue", present: 980, absent: 65 },
    { day: "Wed", present: 955, absent: 76 },
    { day: "Thu", present: 1020, absent: 55 },
    { day: "Fri", present: 1005, absent: 62 },
    { day: "Sat", present: 870, absent: 90 },
    { day: "Sun", present: 790, absent: 110 },
  ],
  Today: [
    { day: "8 AM", present: 820, absent: 80 },
    { day: "9 AM", present: 940, absent: 65 },
    { day: "10 AM", present: 1086, absent: 42 },
  ],
  "7D": [
    { day: "Mon", present: 940, absent: 85 },
    { day: "Tue", present: 980, absent: 65 },
    { day: "Wed", present: 955, absent: 76 },
    { day: "Thu", present: 1020, absent: 55 },
    { day: "Fri", present: 1005, absent: 62 },
    { day: "Sat", present: 870, absent: 90 },
    { day: "Sun", present: 790, absent: 110 },
  ],
  "30D": [
    { day: "Week 1", present: 920, absent: 90 },
    { day: "Week 2", present: 960, absent: 75 },
    { day: "Week 3", present: 990, absent: 68 },
    { day: "Week 4", present: 1010, absent: 60 },
  ],
  "3M": [
    { day: "Aug", present: 890, absent: 105 },
    { day: "Sep", present: 950, absent: 85 },
    { day: "Oct", present: 1020, absent: 60 },
  ],
};

export const attendanceTrend = attendanceTrendByRange.Default;

export const departmentData = [
  { name: "Engineering", employees: 320 },
  { name: "Operations", employees: 245 },
  { name: "Sales", employees: 210 },
  { name: "Marketing", employees: 165 },
  { name: "HR & Admin", employees: 120 },
  { name: "Finance", employees: 95 },
];

export const workforceDistribution = [
  { name: "Present", value: 1086 },
  { name: "On Leave", value: 42 },
  { name: "Absent", value: 96 },
  { name: "Remote", value: 24 },
];

export const recentActivity = [
  {
    name: "Arun Kumar",
    initials: "AK",
    department: "Engineering",
    location: "Chennai",
    action: "Checked in",
    time: "09:02 AM",
    status: "Present",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    department: "Human Resources",
    location: "Bengaluru",
    action: "Checked in",
    time: "09:08 AM",
    status: "Present",
  },
  {
    name: "Rahul Verma",
    initials: "RV",
    department: "Operations",
    location: "Chennai",
    action: "Late check-in",
    time: "09:42 AM",
    status: "Late",
  },
  {
    name: "Sneha Patel",
    initials: "SP",
    department: "Marketing",
    location: "Mumbai",
    action: "Leave approved",
    time: "09:48 AM",
    status: "On Leave",
  },
  {
    name: "Karthik Raj",
    initials: "KR",
    department: "Finance",
    location: "Bengaluru",
    action: "Checked out",
    time: "10:01 AM",
    status: "Present",
  },
];
