export const revenueData = [
  { month: "Jan", income: 3.1, expense: -1.2 },
  { month: "Feb", income: 4.4, expense: -0.9 },
  { month: "Mar", income: 6.2, expense: -1.6 },
  { month: "Apr", income: 5.1, expense: -2.4 },
  { month: "May", income: 7.4, expense: -1.1 },
  { month: "Jun", income: 4.3, expense: -3.2 },
  { month: "Jul", income: 8.1, expense: -1.4 },
  { month: "Aug", income: 6.6, expense: -2.1 },
  { month: "Sep", income: 9.2, expense: -0.8 },
  { month: "Oct", income: 5.8, expense: -2.6 },
  { month: "Nov", income: 8.7, expense: -1.3 },
  { month: "Dec", income: 10.1, expense: -1.9 },
];

export const balanceSplit = [
  { name: "USD", value: 46, color: "var(--chart-1)" },
  { name: "Euro", value: 27, color: "var(--chart-3)" },
  { name: "Pounds", value: 18, color: "var(--chart-4)" },
  { name: "Dinar", value: 9, color: "var(--chart-2)" },
];

export type TxStatus = "Successful" | "Pending" | "Failed";

export const transactions: {
  id: string;
  name: string;
  ref: string;
  date: string;
  amount: string;
  status: TxStatus;
}[] = [
  {
    id: "1",
    name: "Chat Gpt",
    ref: "ID: A3652",
    date: "20 July 2025",
    amount: "$585,658.00",
    status: "Successful",
  },
  {
    id: "2",
    name: "Figma Pro",
    ref: "ID: A3701",
    date: "21 July 2025",
    amount: "$965,854.00",
    status: "Pending",
  },
  {
    id: "3",
    name: "Adobe Cloud",
    ref: "ID: A3744",
    date: "23 July 2025",
    amount: "$985,414.00",
    status: "Successful",
  },
  {
    id: "4",
    name: "Amazon AWS",
    ref: "ID: A3810",
    date: "26 July 2025",
    amount: "$142,220.00",
    status: "Failed",
  },
  {
    id: "5",
    name: "Notion Team",
    ref: "ID: A3866",
    date: "29 July 2025",
    amount: "$64,980.00",
    status: "Successful",
  },
];
