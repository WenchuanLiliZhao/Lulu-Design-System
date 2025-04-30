import styles from "./DataList.module.scss";
import { DataElementType } from "../Types/DataElementType";
import { Icon } from "./Icon";
import { HoverBox } from "./HoverBox";
import { FormattedDate } from "./FormattedDate";

export interface DataListProps {
  list: DataElementType[];
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
      {list.map((dataElement: DataElementType, index: number) => (
        <a href="" className={`${styles["data-list-item"]}`} key={index}>
          <div className={styles["header"]}>
            <div className={styles["data-title-container"]}>
              <span className={`${styles["marker"]} ${styles["icon"]}`}>
                <Icon icon={dataElement.type} />
              </span>

              <span className={styles["data-title"]}>{dataElement.title}</span>
            </div>
            {displayMode !== "simplified" && (
              <div className={styles["date"]}>
                <FormattedDate date={dataElement.date}/>
              </div>
            )}
          </div>

          <HoverBox mode={"default"} />
        </a>
      ))}
    </div>
  );
};
