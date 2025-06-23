import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PageShape } from "../../../ObjectShapes/PageShape";
import { 
  ShoppingBag, 
  TrendingUp, 
  Globe, 
  BarChart3, 
  Download,
  FileText,
  Store,
  Megaphone,
  Palette,
  Star,
  Monitor,
  Smartphone,
  Wifi,
  PieChart,
  LineChart,
  Clipboard,
  FolderOpen,
  Archive,
  BookOpen,
  ShoppingCart,
  CreditCard,
  Target,
  Zap,
  Camera,
  Video,
  DollarSign,
  Activity,
  FileBarChart,
  Building,
  Truck,
  MousePointer,
  Laptop,
  Tablet,
  Calendar,
  Settings,
  Calculator,
  Receipt,
  Coins,
  Users,
  Heart,
  MessageCircle,
  Package,
  Tags,
  Layers,
  Box,
  Send,
  CheckCircle,
  Award,
  UserCheck,
  ThumbsUp,
  Edit,
  Search,
  Filter,
  Banknote,
  Wallet,
  Percent,
  UserPlus,
  Smile,
  Coffee,
  Shirt,
  Eye,
  Sparkles,
  Plane,
  MapPin,
  Clock,
  Crown,
  Handshake,
  Flag,
  Shield,
  Lock
} from "lucide-react";
import JSZip from "jszip";
import styles from "./DepartmentTable.module.scss";

// 部门数据类型定义
interface Department {
  name: string;
  icons: {
    iconName: string;
    IconComponent: React.ComponentType<{ size?: number; className?: string }>;
  }[];
}

// 根据实际人员信息的部门数据，每个部门配对相应数量的 Lucide 图标（无重复）
const departments: Department[] = [
  // 原有部门保留
  { 
    name: "Brand Marketing", 
    icons: [
      { iconName: "trending-up", IconComponent: TrendingUp },
      { iconName: "megaphone", IconComponent: Megaphone },
      { iconName: "palette", IconComponent: Palette },
      { iconName: "star", IconComponent: Star },
      { iconName: "target", IconComponent: Target },
      { iconName: "zap", IconComponent: Zap },
      { iconName: "camera", IconComponent: Camera }
    ]
  },
  { 
    name: "Business Planning & Operations", 
    icons: [
      { iconName: "bar-chart-3", IconComponent: BarChart3 },
      { iconName: "pie-chart", IconComponent: PieChart },
      { iconName: "line-chart", IconComponent: LineChart },
      { iconName: "clipboard", IconComponent: Clipboard },
      { iconName: "dollar-sign", IconComponent: DollarSign },
      { iconName: "activity", IconComponent: Activity },
      { iconName: "calendar", IconComponent: Calendar }
    ]
  },
  {
    name: "Report",
    icons: [
      { iconName: "file-text", IconComponent: FileText },
      { iconName: "folder-open", IconComponent: FolderOpen },
      { iconName: "archive", IconComponent: Archive },
      { iconName: "book-open", IconComponent: BookOpen },
      { iconName: "file-bar-chart", IconComponent: FileBarChart },
      { iconName: "settings", IconComponent: Settings }
    ]
  },
  
  // 新增的8个图标部门
  { 
    name: "EC", 
    icons: [
      { iconName: "globe", IconComponent: Globe },
      { iconName: "monitor", IconComponent: Monitor },
      { iconName: "smartphone", IconComponent: Smartphone },
      { iconName: "wifi", IconComponent: Wifi },
      { iconName: "video", IconComponent: Video },
      { iconName: "mouse-pointer", IconComponent: MousePointer },
      { iconName: "laptop", IconComponent: Laptop },
      { iconName: "tablet", IconComponent: Tablet }
    ]
  },
  { 
    name: "FPA", 
    icons: [
      { iconName: "calculator", IconComponent: Calculator },
      { iconName: "receipt", IconComponent: Receipt },
      { iconName: "coins", IconComponent: Coins },
      { iconName: "credit-card", IconComponent: CreditCard },
      { iconName: "building", IconComponent: Building },
      { iconName: "truck", IconComponent: Truck },
      { iconName: "package", IconComponent: Package },
      { iconName: "layers", IconComponent: Layers }
    ]
  },
  { 
    name: "Retail", 
    icons: [
      { iconName: "shopping-bag", IconComponent: ShoppingBag },
      { iconName: "store", IconComponent: Store },
      { iconName: "shopping-cart", IconComponent: ShoppingCart },
      { iconName: "users", IconComponent: Users },
      { iconName: "heart", IconComponent: Heart },
      { iconName: "message-circle", IconComponent: MessageCircle },
      { iconName: "box", IconComponent: Box },
      { iconName: "send", IconComponent: Send }
    ]
  },
  { 
    name: "Tec", 
    icons: [
      { iconName: "download", IconComponent: Download },
      { iconName: "tags", IconComponent: Tags },
      { iconName: "check-circle", IconComponent: CheckCircle },
      { iconName: "award", IconComponent: Award },
      { iconName: "user-check", IconComponent: UserCheck },
      { iconName: "thumbs-up", IconComponent: ThumbsUp },
      { iconName: "shield", IconComponent: Shield },
      { iconName: "lock", IconComponent: Lock }
    ]
  },
  
  // 新增的3个图标部门
  {
    name: "AP",
    icons: [
      { iconName: "edit", IconComponent: Edit },
      { iconName: "search", IconComponent: Search },
      { iconName: "filter", IconComponent: Filter }
    ]
  },
  {
    name: "Accounting",
    icons: [
      { iconName: "banknote", IconComponent: Banknote },
      { iconName: "wallet", IconComponent: Wallet },
      { iconName: "percent", IconComponent: Percent }
    ]
  },
  {
    name: "Guest",
    icons: [
      { iconName: "user-plus", IconComponent: UserPlus },
      { iconName: "smile", IconComponent: Smile },
      { iconName: "coffee", IconComponent: Coffee }
    ]
  },
  {
    name: "Merchandising",
    icons: [
      { iconName: "shirt", IconComponent: Shirt },
      { iconName: "eye", IconComponent: Eye },
      { iconName: "sparkles", IconComponent: Sparkles }
    ]
  },
  {
    name: "Fulfillment",
    icons: [
      { iconName: "plane", IconComponent: Plane },
      { iconName: "map-pin", IconComponent: MapPin },
      { iconName: "clock", IconComponent: Clock }
    ]
  },
  {
    name: "Ambassador",
    icons: [
      { iconName: "crown", IconComponent: Crown },
      { iconName: "handshake", IconComponent: Handshake },
      { iconName: "flag", IconComponent: Flag }
    ]
  }
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
  const generateSVGContent = (IconComponent: React.ComponentType<{ size?: number; className?: string }>, iconName: string): string => {
    try {
      // 使用 renderToStaticMarkup 渲染实际的 React 组件
      const svgMarkup = renderToStaticMarkup(
        React.createElement(IconComponent, {
          size: 24,
          // 移除 className 以避免样式依赖
        })
      );
      
      // 清理生成的 SVG，移除不必要的属性
      const cleanedSvg = svgMarkup
        .replace(/\sclass="[^"]*"/g, '') // 移除 class 属性
        .replace(/\sstyle="[^"]*"/g, '') // 移除 style 属性
        .replace(/\sdata-[^=]*="[^"]*"/g, ''); // 移除 data 属性
      
      return `<!-- Generated from lucide-react component: ${iconName} -->\n${cleanedSvg}`;
    } catch (error) {
      console.error(`生成 ${iconName} SVG 失败:`, error);
      // 如果渲染失败，返回一个基本的占位符
      return `<!-- Error generating ${iconName} -->
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
>
  <circle cx="12" cy="12" r="10"/>
  <path d="M12 6v6l4 2"/>
</svg>`;
    }
  };

  // 批量下载所有 SVG 文件
  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    
    try {
      const zip = new JSZip();
      const svgFolder = zip.folder("department-icons");
      
      // 为每个部门的每个图标生成 SVG 内容
      departments.forEach((department) => {
        // 改进文件夹名称处理，确保兼容性
        const sanitizedName = department.name
          .replace(/[&]/g, 'and')
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .toLowerCase();
        const departmentFolder = svgFolder?.folder(sanitizedName);
        
        department.icons.forEach((icon) => {
          try {
            const svgContent = generateSVGContent(icon.IconComponent, icon.iconName);
            departmentFolder?.file(`${icon.iconName}.svg`, svgContent);
          } catch (error) {
            console.error(`生成 ${icon.iconName} SVG 失败:`, error);
          }
        });
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
      
      const totalIcons = departments.reduce((sum, dept) => sum + dept.icons.length, 0);
      console.log(`成功生成 ${totalIcons} 个图标的 ZIP 文件`);
      alert(`✅ 成功下载 ${totalIcons} 个图标！\n文件已按部门分文件夹存储。`);
    } catch (error) {
      console.error('批量下载失败:', error);
      alert('❌ 批量下载失败，请稍后重试');
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className={styles["department-table-container"]}>
      <h1>部门图标表格</h1>
      <p>基于实际团队成员的部门信息，每个部门提供多个备选图标，点击任意图标可跳转到 Lucide 官网对应页面</p>
      
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
              <th>备选 Lucide Icons</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={index}>
                <td className={styles["department-name"]}>
                  {department.name}
                  <span className={styles["icon-count"]}>
                    ({department.icons.length}个)
                  </span>
                </td>
                <td className={styles["icon-cell"]}>
                  <div className={styles["icons-container"]}>
                    {department.icons.map((icon, iconIndex) => (
                      <button
                        key={iconIndex}
                        className={styles["icon-button"]}
                        onClick={() => handleIconClick(icon.iconName)}
                        title={`点击查看 ${icon.iconName} 图标详情`}
                      >
                        <icon.IconComponent 
                          size={24} 
                          className={styles["lucide-icon"]}
                        />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={styles["info-note"]}>
        <p><strong>说明：</strong></p>
        <ul>
          <li>表格展示了实际团队成员所在的部门信息</li>
          <li>每个部门都提供了多个语义化的 Lucide 备选图标</li>
          <li>点击任意图标可以跳转到 Lucide 官方页面查看详情</li>
          <li>使用"打包下载全部 SVG"按钮可以一次性下载所有图标的 ZIP 文件，按部门分文件夹存储</li>
          <li>表格使用了现有的设计系统样式变量</li>
          <li>当前共有 {departments.reduce((sum, dept) => sum + dept.icons.length, 0)} 个不重复的图标</li>
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