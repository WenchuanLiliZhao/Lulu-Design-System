import styles from "./DataList.module.scss";
import { DataElementType } from "../Types/DataElementType";
import { Icon } from "./Icon";
import { HoverBox } from "./HoverBox";

export interface DataListProps {
  list: DataElementType[];
  displayMode: "simplified" | "semi-detailed" | "detailed";
}

export const DataList: React.FC<DataListProps> = ({ list, displayMode }) => {
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
              <div className={styles["date-and-time"]}>
                <span className={styles["date"]}>
                  {dataElement.date.toLocaleDateString()}
                </span>
                <span className={styles["time"]}>{dataElement.time}</span>
              </div>
            )}
          </div>

          <HoverBox mode={"default"} />
        </a>
      ))}
    </div>
  );
};
