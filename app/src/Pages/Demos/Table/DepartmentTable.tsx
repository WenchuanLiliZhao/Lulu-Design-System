import React from "react";
import { PageShape } from "../../../ObjectShapes/PageShape";
import { 
  ShoppingBag, 
  TrendingUp, 
  Package, 
  Settings, 
  Zap, 
  Globe, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Truck, 
  CreditCard, 
  Calculator, 
  Monitor, 
  Share2 
} from "lucide-react";
import styles from "./DepartmentTable.module.scss";

// 部门数据类型定义
interface Department {
  name: string;
  iconName: string;
  IconComponent: React.ComponentType<{ size?: number; className?: string }>;
}

// 部门数据，每个部门配对一个合适的 Lucide 图标
const departments: Department[] = [
  { name: "Retail", iconName: "shopping-bag", IconComponent: ShoppingBag },
  { name: "Sales", iconName: "trending-up", IconComponent: TrendingUp },
  { name: "Product", iconName: "package", IconComponent: Package },
  { name: "Operation", iconName: "settings", IconComponent: Settings },
  { name: "Pilot", iconName: "zap", IconComponent: Zap },
  { name: "EC", iconName: "globe", IconComponent: Globe },
  { name: "FP&A", iconName: "bar-chart-3", IconComponent: BarChart3 },
  { name: "Guest", iconName: "users", IconComponent: Users },
  { name: "Merchandising", iconName: "shopping-cart", IconComponent: ShoppingCart },
  { name: "Fulfillment", iconName: "truck", IconComponent: Truck },
  { name: "AP", iconName: "credit-card", IconComponent: CreditCard },
  { name: "Accounting", iconName: "calculator", IconComponent: Calculator },
  { name: "Tech", iconName: "monitor", IconComponent: Monitor },
  { name: "Shared to Me", iconName: "share-2", IconComponent: Share2 },
];

// 表格组件
const DepartmentTableComponent: React.FC = () => {
  // 处理图标点击，跳转到 Lucide 官网对应页面
  const handleIconClick = (iconName: string) => {
    const url = `https://lucide.dev/icons/${iconName}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles["department-table-container"]}>
      <h1>部门图标表格</h1>
      <p>点击任意图标可跳转到 Lucide 官网对应页面</p>
      
      <div className={styles["table-wrapper"]}>
        <table className={styles["department-table"]}>
          <thead>
            <tr>
              <th>部门名称</th>
              <th>Lucide Icon</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={index}>
                <td className={styles["department-name"]}>
                  {department.name}
                </td>
                <td className={styles["icon-cell"]}>
                  <button
                    className={styles["icon-button"]}
                    onClick={() => handleIconClick(department.iconName)}
                    title={`点击查看 ${department.iconName} 图标详情`}
                  >
                    <department.IconComponent 
                      size={24} 
                      className={styles["lucide-icon"]}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={styles["info-note"]}>
        <p><strong>说明：</strong></p>
        <ul>
          <li>每个部门都配对了一个语义化的 Lucide 图标</li>
          <li>图标支持点击跳转到 Lucide 官方页面</li>
          <li>表格使用了现有的设计系统样式变量</li>
        </ul>
      </div>
    </div>
  );
};

// 导出为 PageShape 格式
const DepartmentTable: PageShape = {
  info: {
    slug: "department-table",
    title: "Department Table Demo",
    date: new Date("2025-05-21"),
    type: "page",
  },
  content: <DepartmentTableComponent />,
};

export default DepartmentTable; 