/* 
## Component Overview
- `FormattedDate` is a React functional component designed to format and display dates and times.
- It supports multiple locales (`zh_CN`, `en_US`, `en_GB`) and offers three display modes: `date`, `time`, and `both`.
- The component includes an optional `useNaturalLanguage` prop to toggle between natural language formatting (e.g., "May 5") and numeric formatting (e.g., "2025/05/05").

### Key Implementation Challenges
- **Dynamic Locale Handling**: The component dynamically adjusts its formatting based on the `locale` prop, requiring careful handling of locale strings to ensure compatibility with the `Intl.DateTimeFormat` API.
- **Natural Language vs. Numeric Formatting**: The `useNaturalLanguage` prop introduces conditional logic to switch between short month names and numeric month representations, adding complexity to the date formatting logic.
- **Cross-File Dependencies**: This component is used across multiple files.

---

## 组件功能概览
- `FormattedDate` 是一个 React 函数组件，用于格式化和显示日期与时间。
- 支持多种语言环境（`zh_CN`、`en_US`、`en_GB`），并提供三种显示模式：`date`（仅日期）、`time`（仅时间）和 `both`（日期与时间）。
- 组件包含一个可选的 `useNaturalLanguage` 属性，用于切换自然语言格式（如 "May 5"）与数字格式（如 "2025/05/05"）。

### 主要实现难点
- **动态语言环境处理**：组件根据 `locale` 属性动态调整格式，需要谨慎处理语言环境字符串以确保与 `Intl.DateTimeFormat` API 的兼容性。
- **自然语言与数字格式切换**：`useNaturalLanguage` 属性引入了条件逻辑，用于在短月份名称和数字月份表示之间切换，增加了日期格式化逻辑的复杂性。
- **跨文件依赖**：该组件在多个文件中使用。
*/

import React from 'react';

interface FormattedDateProps {
  date: Date;
  locale?: 'zh_CN' | 'en_US' | 'en_GB';
  displayMode?: 'date' | 'time' | 'both';
  useNaturalLanguage?: boolean; // 新增属性，决定是否使用自然语言显示模式
}

// `FormattedDate` component formats and displays a date and/or time based on the provided props
// `FormattedDate` 组件根据提供的属性格式化并显示日期和/或时间
export const FormattedDate: React.FC<FormattedDateProps> = ({ date, locale = "en_GB", displayMode = "both", useNaturalLanguage = false }) => {
  // Create a formatter for the date based on the locale and natural language preference
  // 根据语言环境和自然语言偏好创建日期格式化器
  const formatter = new Intl.DateTimeFormat(locale.replace('_', '-'), {
    year: 'numeric',
    month: useNaturalLanguage ? 'short' : '2-digit',
    day: '2-digit',
  });

  // Create a formatter for the time based on the locale
  // 根据语言环境创建时间格式化器
  const timeFormatter = new Intl.DateTimeFormat(locale.replace('_', '-'), {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Format the date using natural language or numeric representation
  // 使用自然语言或数字表示法格式化日期
  const formattedDate = useNaturalLanguage
    ? formatter.format(date)
    : `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

  // Format the time
  // 格式化时间
  const formattedTime = timeFormatter.format(date);

  return (
    <span>
      {/* Render only the date if displayMode is 'date' */}
      {/* 如果 displayMode 是 'date'，则仅渲染日期 */}
      {displayMode === 'date' && <span>{formattedDate}</span>}

      {/* Render only the time if displayMode is 'time' */}
      {/* 如果 displayMode 是 'time'，则仅渲染时间 */}
      {displayMode === 'time' && <span>{formattedTime}</span>}

      {/* Render both date and time if displayMode is 'both' */}
      {/* 如果 displayMode 是 'both'，则同时渲染日期和时间 */}
      {displayMode === 'both' && (
        <span>
          <span>{formattedDate}</span> <span>{formattedTime}</span>
        </span>
      )}
    </span>
  );
};