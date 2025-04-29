import styles from "./DataList.module.scss"
import { DataElementType } from "../Types/DataElementType";
import { Icon } from "./Icon";
import { HoverBox } from "./HoverBox";

export interface DataListProps {
  list: DataElementType[];
  displayMode: "simplified" | "semi-detailed" | "detailed";
  listMode: "ordered" | "unordered";
}

export const DataList: React.FC<DataListProps> = ({
  list,
  displayMode,
  listMode,
}) => {
  return (
    <div className={styles["data-list"]}>
      {list.map((dataElement: DataElementType) => (
        <a href="" className={styles["data-list-item"]} key={dataElement.code}>
          <div>
            {listMode !== "ordered" && (
              <Icon icon={"integration_instructions"} />
            )}

            {dataElement.name}
          </div>
          {displayMode !== "simplified" && (
            <div>
              <span>{dataElement.date.toLocaleDateString()}</span>
              <span>{dataElement.time}</span>
            </div>
          )}

          <HoverBox mode={"default"} />
        </a>
      ))}
    </div>
  );
};