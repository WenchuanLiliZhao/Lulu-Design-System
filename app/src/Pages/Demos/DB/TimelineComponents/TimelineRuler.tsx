import React from "react";
import {
  sortTimelineItemsByStartDate,
  TimelineItemShape,
} from "./TimelineItemShape";
import { TimelineItemInterval } from "./TimelineFunctions";
import styles from "./TimelineRuler.module.scss";
interface TimelineProps {
  inputData: TimelineItemShape[];
}

export const TimelineRuler: React.FC<TimelineProps> = ({ inputData }) => {
  const sortedItems = sortTimelineItemsByStartDate(inputData);
  const yearList = TimelineItemInterval({ inputData: sortedItems });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const Column = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles["timeline-ruler-column"]}>{children}</div>;
  };

  const dayWidth = 24;

  return (
    <div className={styles["timeline-ruler-container"]}>
      <Column>
        {yearList.map((year) => (
          <div key={year} className={styles["timeline-ruler-year"]}>
            <Column>
              {Array.from({ length: 12 }, (_, monthIndex) => (
                <div
                  key={monthIndex}
                  className={styles["timeline-ruler-month"]}
                >
                  <div className={styles["timeline-ruler-month-label"]}>
                    <div className={styles["timeline-ruler-month-label-month"]}>
                      {monthNames[monthIndex]}
                    </div>
                    <div className={styles["timeline-ruler-month-label-year"]}>
                      {year}
                    </div>
                  </div>
                  <Column>
                    {Array.from(
                      { length: getDaysInMonth(year, monthIndex) },
                      (_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={styles["timeline-ruler-day"]}
                          style={{ width: `${dayWidth}px` }}
                        >
                          <div className={styles["timeline-ruler-day-label"]}>
                            {dayIndex + 1}
                          </div>

                          <div className={styles["timeline-ruler-day-items"]}>
                            {sortedItems.map((item) => {
                              const itemStartDate = new Date(item.startDate);
                              const itemStartYear = itemStartDate.getFullYear();
                              const itemStartMonth = itemStartDate.getMonth();
                              const itemStartDay = itemStartDate.getDate();

                              if (itemStartYear === year && itemStartMonth === monthIndex && itemStartDay === dayIndex + 1) {
                                const itemEndDate = new Date(item.endDate);
                                const durationInDays = (itemEndDate.getTime() - itemStartDate.getTime()) / (1000 * 60 * 60 * 24);

                                return (
                                  <div
                                    key={item.id}
                                    className={styles["timeline-item"]}
                                    style={{
                                      height: 32,
                                      width: `${durationInDays * dayWidth}px`,
                                    }}
                                  >
                                    <div className={styles["timeline-item-name"]}>{item.name}</div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )
                    )}
                  </Column>
                </div>
              ))}
            </Column>
          </div>
        ))}
      </Column>
    </div>
  );
};
