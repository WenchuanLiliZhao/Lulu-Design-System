import React from 'react';

interface FormattedDateProps {
  date: Date;
  locale?: 'zh_CN' | 'en_US' | 'en_GB';
  displayMode?: 'date' | 'time' | 'both';
  useNaturalLanguage?: boolean; // 新增属性，决定是否使用自然语言显示模式
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ date, locale = "en_GB", displayMode = "both", useNaturalLanguage = false }) => {
  const formatter = new Intl.DateTimeFormat(locale.replace('_', '-'), {
    year: 'numeric',
    month: useNaturalLanguage ? 'short' : '2-digit',
    day: '2-digit',
  });

  const timeFormatter = new Intl.DateTimeFormat(locale.replace('_', '-'), {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = useNaturalLanguage
    ? formatter.format(date)
    : `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

  const formattedTime = timeFormatter.format(date);

  return (
    <span>
      {displayMode === 'date' && <span>{formattedDate}</span>}
      {displayMode === 'time' && <span>{formattedTime}</span>}
      {displayMode === 'both' && (
        <span>
          <span>{formattedDate}</span> <span>{formattedTime}</span>
        </span>
      )}
    </span>
  );
};