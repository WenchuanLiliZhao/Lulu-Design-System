# Lulu Design System - 颜色使用指导

## 概述

本文档基于 `color.scss` 中定义的颜色系统，为设计师和开发者提供颜色使用指导。我们的颜色系统支持亮色模式和暗色模式，并包含语义化的颜色变量。

## 颜色系统架构

### 主题支持
- **亮色模式 (Light Theme)**: 默认主题，适用于日间使用
- **暗色模式 (Dark Theme)**: 通过 `data-theme="dark"` 属性激活
- **系统主题检测**: 自动根据用户系统偏好切换主题

### 颜色变量分类

#### 1. 品牌颜色 (Brand Colors)
```scss
--brand-color;           // 品牌主色
--color-semantic-active; // 语义化激活色
```

#### 2. 文本颜色 (Text Colors)
```scss
--color-main;    // 主要文本
--color-sec;     // 次要文本
--color-neg;     // 否定/禁用文本
```

#### 3. 背景颜色 (Background Colors)
```scss
--color-bg-main;           // 主背景
--color-bg-sec;         // 次要背景
--color-bg-sec-2;       // 第三级背景
```

#### 4. 边框颜色 (Border Colors)
```scss
--color-border-main;     // 主边框
--color-border-darken-trans; // 深色边框
```

#### 5. 透明度变体 (Transparency Variants)
所有颜色都提供透明度变体，用于创建层次感和交互效果。

## 使用指导

### 🎯 文本颜色使用原则

#### `--color-main`
**使用场景:**
- 页面标题
- 主要内容文本
- 重要信息显示
- 导航菜单项

**示例:**
```css
.page-title {
  color: var(--color-main);
}
```

#### `--color-sec`
**使用场景:**
- 副标题
- 描述文本
- 辅助信息
- 时间戳
- 标签文本

**示例:**
```css
.description {
  color: var(--color-sec);
}
```

#### `--color-neg`
**使用场景:**
- 禁用状态的文本
- 错误信息
- 次要操作按钮文本
- 占位符文本

**示例:**
```css
.disabled-text {
  color: var(--color-neg);
}
```

### 🎨 背景颜色使用原则

#### `--color-bg-main`
**使用场景:**
- 页面主背景
- 卡片背景
- 模态框背景

**示例:**
```css
.page-container {
  background-color: var(--color-bg-main);
}
```

#### `--color-bg-sec`
**使用场景:**
- 侧边栏背景
- 工具栏背景
- 次要区域背景
- 悬停状态

**示例:**
```css
.sidebar {
  background-color: var(--color-bg-sec);
}
```

#### `--color-bg-sec-2`
**使用场景:**
- 嵌套卡片背景
- 输入框背景
- 选中状态背景
- 分组背景

**示例:**
```css
.input-field {
  background-color: var(--color-bg-sec-2);
}
```

### 🔲 边框颜色使用原则

#### `--color-border-main`
**使用场景:**
- 卡片边框
- 输入框边框
- 分割线
- 表格边框

**示例:**
```css
.card {
  border: 1px solid var(--color-border-main);
}
```

#### `--color-border-darken-trans`
**使用场景:**
- 阴影效果
- 强调边框
- 焦点状态边框
- 错误状态边框

**示例:**
```css
.focused-input {
  border: 2px solid var(--color-border-darken-trans);
}
```

### 🎯 品牌颜色使用原则

#### `--brand-color`
**使用场景:**
- 主要按钮
- 品牌标识
- 重要操作
- 强调元素

**示例:**
```css
.primary-button {
  background-color: var(--brand-color);
}
```

#### `--color-semantic-active`
**使用场景:**
- 激活状态
- 链接颜色
- 选中状态
- 交互反馈

**示例:**
```css
.active-link {
  color: var(--color-semantic-active);
}
```

## 透明度使用指导

### 透明度变体命名规则
- `-trans`: 透明度变体
- 数值表示透明度级别

### 使用场景
- **极轻微透明度**: 极轻微的背景层次
- **轻微透明度**: 轻微的背景层次
- **低透明度**: 边框和分割线
- **中等透明度**: 阴影和强调
- **高透明度**: 次要文本
- **最高透明度**: 主要文本透明度

## 最佳实践

### ✅ 推荐做法

1. **始终使用 CSS 变量**
   ```css
   /* ✅ 正确 */
   color: var(--color-main);
   
   /* ❌ 错误 */
   color: [具体色值];
   ```

2. **保持层次结构**
   - 主文本 → `--color-main`
   - 次要文本 → `--color-sec`
   - 禁用文本 → `--color-neg`

3. **合理使用透明度**
   - 创建视觉层次
   - 增强可读性
   - 保持一致性

4. **考虑暗色模式**
   - 所有颜色都支持主题切换
   - 测试两种模式下的效果

### ❌ 避免的做法

1. **硬编码颜色值**
2. **过度使用透明度**
3. **忽略主题切换**
4. **使用非系统颜色**

## 组件示例

### 按钮组件
```css
.btn-primary {
  background-color: var(--brand-color);
  color: white;
  border: none;
}

.btn-secondary {
  background-color: var(--color-bg-sec);
  color: var(--color-main);
  border: 1px solid var(--color-border-main);
}

.btn-disabled {
  background-color: var(--color-bg-sec-2);
  color: var(--color-neg);
  border: 1px solid var(--color-border-main);
}
```

### 卡片组件
```css
.card {
  background-color: var(--color-bg-main);
  border: 1px solid var(--color-border-main);
  color: var(--color-main);
}

.card-header {
  background-color: var(--color-bg-sec);
  border-bottom: 1px solid var(--color-border-main);
}
```

### 输入框组件
```css
.input {
  background-color: var(--color-bg-sec-2);
  border: 1px solid var(--color-border-main);
  color: var(--color-main);
}

.input:focus {
  border-color: var(--color-semantic-active);
}
```

## 主题切换实现

### JavaScript 实现
```javascript
// 切换主题
function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
}

// 检测系统主题
function detectSystemTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}
```

