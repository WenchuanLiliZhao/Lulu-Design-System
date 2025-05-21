import { PageShape } from "../../../ObjectShapes/PageShape";
import { ReactNode, useRef } from "react";
import { CDD_Nav } from "./CDD_SiteConfig";

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

type EmailListCardItemType = {
  title: string;
  content: string;
};

interface EmailListCardProps {
  items: EmailListCardItemType[];
}

export const EmailListCard: React.FC<EmailListCardProps> = ({ items }) => {
  const styles = {
    container: {
      backgroundColor: "rgba(129, 129, 129, 0.08)",
      padding: "1rem",
      borderRadius: "4px",
      border: "1px solid rgba(129, 129, 129, 0.08)",
    },
    item: {},
    title: {
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "1.5",
    },
    content: {
      fontSize: "14px",
      lineHeight: "1.5",
      marginTop: "0.25rem",
    },
  };

  return (
    <div style={{ ...styles.container }}>
      {items.map((item: EmailListCardItemType, index: number) => (
        <div
          style={{
            ...styles.item,
            ...(index !== 0 && {
              marginTop: "0.5rem",
              borderTop: "1px solid rgba(129, 129, 129, 0.08)",
              paddingTop: "0.5rem",
            }),
          }}
          key={index}
        >
          <div style={{ ...styles.title }}>{item.title}</div>
          <div style={{ ...styles.content }}>{item.content}</div>
        </div>
      ))}
    </div>
  );
};

interface CDD_EmailPageProps {
  children: ReactNode;
}

export const EmailTwoColumnContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isMobile = window.innerWidth < 600;

  const styles = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
    gap: "1rem",
  };

  return <div style={{ ...styles, ...emailItemStyles }}>{children}</div>;
};

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
  title: string;
  content: string[];
};

interface EmailTableProps {
  rows: EmailTableHeaderType[];
}

export const EmailTable: React.FC<EmailTableProps> = ({ rows }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ minWidth: "800px", width: "100%", fontSize: "14px", borderCollapse: "collapse" as 'collapse' }}>
        <thead>
          <tr>
            {rows.map((row, k: number) => (
              <th
                key={k}
                style={{
                  textAlign: "left",
                  border: "1px solid rgba(129, 129, 129, 0.16)",
                  backgroundColor: "rgba(129, 129, 129, 0.08)",
                  padding: "0.5rem",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {row.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows[0].content.map((_, rowIndex) => (
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
                  }}
                >
                  {row.content[rowIndex]}
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
            <EmailTwoColumnContainer>
              <EmailListCard
                items={[
                  {
                    title: "异常数据量",
                    content: "2（总数据量2，占比100.0%）",
                  },
                  { title: "规则名称", content: "TryOn设备预警" },
                  { title: "规则描述", content: "TryOn设备预警" },
                  {
                    title: "检查对象",
                    content:
                      "门店维度信息(dim_store), fact_rfid_fitting_room_trial_log_di",
                  },
                  {
                    title: "检查时间",
                    content: "2025-05-21 08:00:05~2025-05-21 08:00:11",
                  },
                ]}
              />
              <EmailListCard
                items={[
                  { title: "结果描述", content: "严重" },
                  { title: "归属专项", content: "试穿设备监控" },
                  { title: "负责人", content: "CK Chen （陈恺）" },
                  { title: "归属系统", content: "DataLake" },
                  { title: "数据源", content: "DataLake_prod" },
                ]}
              />
            </EmailTwoColumnContainer>
            <EmailParagraph>{"异常数据样例如下,详情见附件："}</EmailParagraph>
            <EmailTable
              rows={[
                {
                  title: "warehouse_slug",
                  content: ["98765", "54321"],
                },
                {
                  title: "store_id_description",
                  content: ["假店名一", "假店名二"],
                },
                {
                  title: "status",
                  content: ["Inactive", "Inactive"],
                },
                {
                  title: "open_date",
                  content: ["2022-02-02", "2022-07-20"],
                },
                {
                  title: "门店设备数-前1日采集到试穿",
                  content: ["4", "2"],
                },
                {
                  title: "门店试衣间数-MDM",
                  content: ["5", "3"],
                },
              ]}
            />
            <EmailParagraph>
              <a href="#" style={{color: "royalblue"}}>更多详细信息请登录China Data Discover</a>
            </EmailParagraph>
          </>
        }
      />
    </>
  ),
};
