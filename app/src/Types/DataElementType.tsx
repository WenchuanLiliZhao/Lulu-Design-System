export const TypeToIcon = {
  "dashboard": "dashboard",
  "report": "monitoring",
  "dataset": "dataset",
} as const;

export type DataElementType = {
  code: string; // eg., `ap_employee_purchase_check_df`
  title: string; // eg., `Employee Purchase Check`
  capacity: number;
  date: Date;
  time: string; // eg., '14:30:00' (HH:mm:ss format)
  type: keyof typeof TypeToIcon; // Optional property to specify the type of data element
};