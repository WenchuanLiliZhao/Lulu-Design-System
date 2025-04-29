export interface DataElementType {
  code: string; // eg., `ap_employee_purchase_check_df`
  name: string; // eg., `Employee Purchase Check`
  capacity: number;
  date: Date;
  time: string; // eg., '14:30:00' (HH:mm:ss format)
}