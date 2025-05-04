import styles from "./DataList.module.scss";
import { Icon } from "./Icon";
import { HoverBox } from "./HoverBox";
import { FormattedDate } from "../Functions/FormattedDate";
import { Page } from "../Types/PageType";

export interface DataListProps {
  list: Page[];
  displayMode: "simplified" | "semi-detailed" | "detailed";
}

export const DataList: React.FC<DataListProps> = ({ list, displayMode }) => {
  if (list.length === 0) {
    return (
      <div className={styles["data-list-empty"]}>
        <div className={styles["hint"]}>
          <img
            className={styles["img"]}
            src="https://doodleipsum.com/800x450/flat?i=9b838476dba0a936cd163213a1d7d34c"
            alt="No data available"
          />
          <div className={styles["text"]}>
            <p className={styles["title"]}>Ops, no data available!</p>

            <p className={styles["subtitle"]}>No data, you can clock out now. There's a beautiful pot of flowers waiting for you at home!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["data-list"]}>
      {list.map((dataElement: Page, index: number) => (
        <a href={`/${dataElement.info.slug}`} className={`${styles["data-list-item"]}`} key={index}>
          <div className={styles["header"]}>
            <div className={styles["data-title-container"]}>
              <span className={`${styles["marker"]} ${styles["icon"]}`}>
                <Icon icon={dataElement.info.icon ? dataElement.info.icon : "description"} />
              </span>

              <span className={styles["data-title"]}>{dataElement.info.title}</span>
            </div>
            {displayMode !== "simplified" && (
              <div className={styles["date"]}>
                <FormattedDate date={dataElement.info.date}/>
              </div>
            )}
          </div>

          <HoverBox mode={"default"} />
        </a>
      ))}
    </div>
  );
};
