import { DataElementType } from "../DataElementType";

export const Long: DataElementType[] = [
  {
    code: "ap_employee_purchase_check_df",
    name: "Employee Purchase Check",
    capacity: 100,
    date: new Date("2025-04-29"),
    time: "14:30:00",
  },
  {
    code: "ap_inventory_audit_df",
    name: "Inventory Audit",
    capacity: 200,
    date: new Date("2025-04-28"),
    time: "10:15:00",
  },
  {
    code: "ap_sales_analysis_df",
    name: "Sales Analysis",
    capacity: 150,
    date: new Date("2025-04-27"),
    time: "09:45:00",
  },
  {
    code: "ap_customer_feedback_df",
    name: "Customer Feedback",
    capacity: 300,
    date: new Date("2025-04-26"),
    time: "16:00:00",
  },
  {
    code: "ap_product_performance_df",
    name: "Product Performance",
    capacity: 250,
    date: new Date("2025-04-25"),
    time: "11:30:00",
  },
  {
    code: "ap_supply_chain_df",
    name: "Supply Chain",
    capacity: 180,
    date: new Date("2025-04-24"),
    time: "13:20:00",
  },
  {
    code: "ap_financial_overview_df",
    name: "Financial Overview",
    capacity: 220,
    date: new Date("2025-04-23"),
    time: "15:10:00",
  },
  {
    code: "ap_employee_performance_df",
    name: "Employee Performance",
    capacity: 170,
    date: new Date("2025-04-22"),
    time: "08:50:00",
  },
  {
    code: "ap_marketing_campaign_df",
    name: "Marketing Campaign",
    capacity: 190,
    date: new Date("2025-04-21"),
    time: "14:00:00",
  },
  {
    code: "ap_customer_retention_df",
    name: "Customer Retention",
    capacity: 210,
    date: new Date("2025-04-20"),
    time: "10:40:00",
  },
  {
    code: "ap_product_launch_df",
    name: "Product Launch",
    capacity: 230,
    date: new Date("2025-04-19"),
    time: "12:15:00",
  },
  {
    code: "ap_revenue_forecast_df",
    name: "Revenue Forecast",
    capacity: 240,
    date: new Date("2025-04-18"),
    time: "09:30:00",
  },
  {
    code: "ap_customer_segmentation_df",
    name: "Customer Segmentation",
    capacity: 260,
    date: new Date("2025-04-17"),
    time: "11:00:00",
  },
];

export const Empty: DataElementType[] = [];

export const Example_DataElementArray = {
  Long,
  Empty,
}