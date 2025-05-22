import { PageShape } from "../../../ObjectShapes/PageShape";
import { ReactNode, useRef } from "react";
import { CDD_Nav } from "./CDD_SiteConfig";
import React from "react";

interface CalloutProps {
  type: "Caution" | "Information" | "Warning" | "Danger";
  content: string;
}

const emailItemStyles = {
  margin: "1rem 0",
};

export const EmailCallout: React.FC<CalloutProps> = ({ type, content }) => {
  const styles = {
    container: {
      padding: "1rem",
      borderRadius: "4px",
      backgroundColor: "rgba(236, 212, 71, 0.24)",
      lineHeight: "1.5",
      fontSize: "14px",
    },
    title: {
      fontWeight: "bold",
    },
  };

  return (
    <div style={{ ...styles.container, ...emailItemStyles }}>
      <div>
        <span style={styles.title}>{type}: </span>
        {content}
      </div>
    </div>
  );
};

interface CDD_EmailPageProps {
  children: ReactNode;
}

export const EmailParagraph: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const styles = {
    fontSize: "14px",
    lineHeight: "1.5",
  };
  return <div style={{ ...styles, ...emailItemStyles }}>{children}</div>;
};

type EmailTableHeaderType = {
  title?: string;
  content: {
    title?: string;
    value: string;
  }[];
};

interface EmailTableProps {
  rows: EmailTableHeaderType[];
}

export const EmailTable: React.FC<EmailTableProps> = ({ rows }) => {
  // Find the maximum number of content items across all rows
  const maxContentLength = Math.max(...rows.map((row) => row.content.length));

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          fontSize: "14px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {rows.map((row, k: number) => (
              <React.Fragment key={k}>
                {row.title && (
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid rgba(129, 129, 129, 0.16)",
                      backgroundColor: "rgba(129, 129, 129, 0.08)",
                      padding: "0.5rem",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      width: `${100 / rows.length}%`,
                    }}
                  >
                    {row.title}
                  </th>
                )}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxContentLength }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {rows.map((row, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    textAlign: "left",
                    border: "1px solid rgba(129, 129, 129, 0.16)",
                    padding: "0.5rem",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    width: `${100 / rows.length}%`,
                  }}
                >
                  {row.content[rowIndex] && (
                    <>
                      {row.content[rowIndex].title && (
                        <>
                          <strong style={{ fontWeight: "bold" }}>
                            <span>{row.content[rowIndex].title}</span>
                          </strong>
                          <br />
                        </>
                      )}
                      <span>{row.content[rowIndex].value}</span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CDD_EmailPageComponent = ({ children }: CDD_EmailPageProps) => {
  const pageRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (pageRef.current) {
      const htmlContent = pageRef.current.innerHTML;
      navigator.clipboard
        .writeText(htmlContent)
        .then(() => {
          alert("HTML content copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const alienStyle = {
    btn: {
      cursor: "pointer",
      padding: "1rem",
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      marginTop: "1rem",
    },
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* begin email page */}
      <div ref={pageRef}>{children}</div>
      {/* end email page */}
      <div
        style={alienStyle.btn as React.CSSProperties}
        onClick={copyToClipboard}
      >
        Copy HTML
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const CDD_EmailPage: PageShape = {
  info: {
    slug: "cdd-email-page",
    title: "CDD Email Page",
    date: new Date("2025-05-21"),
    type: "page",
  },
  content: (
    <>
      <CDD_Nav />
      <CDD_EmailPageComponent
        children={
          <>
            <EmailCallout
              type="Caution"
              content={
                "This email originated from outside of the organization. Do not click links, scan QR codes, or open attachments unless you can confirm the sender and know the content is safe. If you think this email might be suspicious, notify lululemon's Cybersecurity team by clicking the HOX button."
              }
            />
            <EmailTable
              rows={[
                {
                  content: [
                    {
                      title: "异常数据量",
                      value: "2（总数据量2，占比100.0%）",
                    },
                    {
                      title: "规则名称",
                      value: "TryOn设备预警",
                    },
                    {
                      title: "规则描述",
                      value: "TryOn设备预警",
                    },
                    {
                      title: "检查对象",
                      value:
                        "门店维度信息(acropolis), ach_fact_tryon_device_info",
                    },
                    {
                      title: "检查时间",
                      value: "2025-05-21 08:00:05~2025-05-21 08:00:11",
                    },
                  ],
                },
                {
                  content: [
                    {
                      title: "结果描述",
                      value: "严重",
                    },
                    {
                      title: "归属专项",
                      value: "竞技场无法加载",
                    },
                    {
                      title: "负责人",
                      value: "阿尔忒弥斯",
                    },
                    {
                      title: "归属系统",
                      value: "Aropolis",
                    },
                    {
                      title: "数据源",
                      value: "Aropolis_TryOn",
                    },
                  ],
                },
              ]}
            />
            <EmailParagraph>{"异常数据样例如下,详情见附件："}</EmailParagraph>

            <EmailTable
              rows={[
                {
                  title: "warehouse_code",
                  content: [{ value: "23451" }, { value: "12345" }],
                },
                {
                  title: "store_name_cn",
                  content: [
                    { value: "幽暗城理发店" },
                    { value: "吉他 IV 加达里交易中心" },
                  ],
                },
                {
                  title: "status",
                  content: [{ value: "Opened" }, { value: "Opened" }],
                },
                {
                  title: "open_date",
                  content: [{ value: "2021-01-14" }, { value: "2025-01-22" }],
                },
                {
                  title: "门店设备数-前1日采集到试穿",
                  content: [{ value: "1" }, { value: "6" }],
                },
                {
                  title: "门店试衣间数-MDM",
                  content: [{ value: "11" }, { value: "8" }],
                },
              ]}
            />
            <EmailParagraph>
              <p style={{ color: "royalblue" }}>
                更多详细信息请登录China Data Discover
              </p>
            </EmailParagraph>
          </>
        }
      />
    </>
  ),
};
