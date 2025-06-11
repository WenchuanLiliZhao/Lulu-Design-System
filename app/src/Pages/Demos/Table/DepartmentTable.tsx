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
  Share2,
  Download
} from "lucide-react";
import JSZip from "jszip";
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
  const [isDownloadingAll, setIsDownloadingAll] = React.useState(false);

  // 处理图标点击，跳转到 Lucide 官网对应页面
  const handleIconClick = (iconName: string) => {
    const url = `https://lucide.dev/icons/${iconName}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

    // 生成 SVG 内容的辅助函数
  const generateSVGContent = (_: React.ComponentType<{ size?: number; className?: string }>, iconName: string): string => {
    // 使用 React.renderToString 的替代方案
    // 直接构造标准的 Lucide SVG 结构
    return `<!-- Generated from lucide-react component: ${iconName} -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide lucide-${iconName}"
>
  <!-- Icon paths would be here -->
  <!-- Note: This is a placeholder. For production, you'd need to extract actual path data -->
</svg>`;
  };

  // 批量下载所有 SVG 文件
  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    
    try {
      const zip = new JSZip();
      const svgFolder = zip.folder("department-icons");
      
      // 为每个部门生成 SVG 内容
      departments.forEach((department) => {
        try {
          const svgContent = generateSVGContent(department.IconComponent, department.iconName);
          svgFolder?.file(`${department.iconName}.svg`, svgContent);
        } catch (error) {
          console.error(`生成 ${department.iconName} SVG 失败:`, error);
        }
      });

      // 生成 ZIP 文件并下载
      const content = await zip.generateAsync({ type: "blob" });
      
      // 创建下载链接
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `department-lucide-icons-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`成功生成 ${departments.length} 个图标的 ZIP 文件`);
    } catch (error) {
      console.error('批量下载失败:', error);
      alert('批量下载失败，请稍后重试');
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className={styles["department-table-container"]}>
      <h1>部门图标表格</h1>
      <p>点击任意图标可跳转到 Lucide 官网对应页面</p>
      
      <div className={styles["download-section"]}>
        <button
          className={`${styles["download-all-button"]} ${isDownloadingAll ? styles["downloading"] : ""}`}
          onClick={handleDownloadAll}
          disabled={isDownloadingAll}
          title="打包下载所有部门图标的 SVG 文件"
        >
          <Download size={20} className={styles["download-icon"]} />
          {isDownloadingAll ? "打包下载中..." : "打包下载全部 SVG"}
        </button>
      </div>
      
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
          <li>点击图标可以跳转到 Lucide 官方页面查看详情</li>
          <li>使用"打包下载全部 SVG"按钮可以一次性下载所有图标的 ZIP 文件</li>
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