# Topology 自定义节点颜色功能

## 概述

此功能允许您在 Network Topology 组件中为节点指定自定义的 hex 颜色值，而不是仅依赖于基于 group number 的默认颜色方案。

## 功能特性

- 📌 **直接色值支持**: 在数据中直接指定 hex 颜色值（如 `#FF6B6B`）
- 🔄 **向后兼容**: 没有指定颜色的节点将继续使用默认的 group-based 颜色方案
- 🎨 **优先级系统**: 自定义颜色 > group 颜色
- 🏗️ **类型安全**: 完整的 TypeScript 类型支持

## 使用方法

### 1. 在数据中添加颜色属性

在您的 `TreeNodesShape` 数据结构中，为任何节点的 `page.info` 对象添加可选的 `color` 属性：

```typescript
const treeData: TreeNodesShape[] = [
  {
    page: {
      info: {
        slug: "example-node",
        title: "示例节点",
        date: new Date("2025-01-01"),
        type: "database",
        tags: ["example"],
        color: "#FF6B6B" // 添加自定义颜色
      },
      content: <div>示例内容</div>
    },
    children: [
      {
        page: {
          info: {
            slug: "child-node",
            title: "子节点",
            date: new Date("2025-01-01"),
            type: "dataset",
            tags: ["child"],
            color: "#4ECDC4" // 子节点也可以有自定义颜色
          },
          content: <div>子节点内容</div>
        },
        children: []
      }
    ]
  }
];
```

### 2. 在拓扑组件中使用

不需要额外的配置，现有的 `NetworkTopology` 和 `TopologyWithParameterControls` 组件会自动识别和使用颜色属性：

```typescript
import { TopologyWithParameterControls } from "./Components/Tree/NetworkTopology/TopologyWithParameterControls";
import { transformTreeNodes, mergeTagsOfTreeNodes } from "./Components/Tree/TreeExplorer";

function MyTopologyPage() {
  return (
    <TopologyWithParameterControls
      treeData={mergeTagsOfTreeNodes(transformTreeNodes(treeData))}
    />
  );
}
```

## 示例数据

在 `Example_TreeNodes.tsx` 中已经添加了一些示例，展示了如何使用自定义颜色：

| 节点名称 | 颜色值 | 显示颜色 |
|---------|--------|----------|
| Math (根节点) | `#FF6B6B` | 🔴 红色 |
| Number Theory | `#4ECDC4` | 🟢 青色 |
| Set Theory | `#45B7D1` | 🔵 蓝色 |
| Prime Numbers | `#96CEB4` | 🟢 薄荷绿 |
| Modular Arithmetic | `#FECA57` | 🟡 金黄色 |

## 技术实现

### 类型定义

新的颜色功能通过以下类型定义支持：

```typescript
// PageShape.tsx
export interface PageInfo {
  // ... 其他属性
  color?: string; // 可选的 hex 颜色值
}

// TreeExplorer.tsx
export interface NodeShape {
  // ... 其他属性
  color?: string; // 节点的颜色（hex 色值）
}

// NetworkTopology.tsx
export interface GraphNodeShape {
  // ... 其他属性
  color?: string; // 图形节点的颜色属性
}
```

### 渲染逻辑

在 `createCircles.ts` 中的颜色选择逻辑：

```typescript
// 优先使用节点自定义颜色，否则使用 group 颜色
.style('fill', d => d.color || color(d.group?.toString() || ''))
```

## 最佳实践

### 1. 颜色选择建议

- 使用高对比度的颜色以确保可读性
- 避免使用过于相似的颜色，特别是在相邻节点之间
- 考虑色盲友好的颜色组合

### 2. 推荐颜色调色板

```typescript
const recommendedColors = {
  primary: "#FF6B6B",     // 红色 - 重要节点
  secondary: "#4ECDC4",   // 青色 - 数据库节点
  accent: "#45B7D1",      // 蓝色 - 分析节点
  success: "#96CEB4",     // 薄荷绿 - 成功状态
  warning: "#FECA57",     // 金黄色 - 警告状态
  info: "#54A0FF",        // 蓝色 - 信息节点
  neutral: "#95A5A6"      // 灰色 - 普通节点
};
```

### 3. 组织结构建议

- **根节点**: 使用醒目的主色调（如红色、蓝色）
- **分类节点**: 使用不同色系区分不同类别
- **叶子节点**: 使用相近但有区别的颜色

## 兼容性说明

- ✅ **完全向后兼容**: 现有代码无需修改
- ✅ **可选功能**: `color` 属性是可选的
- ✅ **混合使用**: 可以在同一个拓扑中混合使用自定义颜色和默认颜色
- ✅ **类型安全**: 完整的 TypeScript 支持

## 故障排除

### 常见问题

**Q: 我添加了颜色但节点仍然显示默认颜色**
A: 检查颜色值格式是否正确（必须是有效的 hex 格式，如 `#FF6B6B`）

**Q: 颜色在不同浏览器中显示不一致**
A: 使用标准的 6 位 hex 颜色格式，避免使用 3 位缩写格式

**Q: 如何重置到默认颜色方案**
A: 移除或设置 `color` 属性为 `undefined`，节点将使用基于 group 的默认颜色

## 更新历史

- **v1.0.0** (2025-01-01): 初始版本，支持基本的自定义颜色功能
- 添加了 `PageInfo.color` 属性
- 更新了数据转换流程
- 修改了渲染逻辑以支持自定义颜色 