import React from "react";
import { TimelineItemShape } from "./TimelineItemShape";
import { TimelineItemInterval } from "./TimelineFunctions";
import styles from "./TimelineRuler.module.scss";
interface TimelineProps {
  inputData: TimelineItemShape[];
}

export const TimelineRuler: React.FC<TimelineProps> = ({ inputData }) => {
  const yearList = TimelineItemInterval({ inputData: inputData });
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

  return (
    <div className={styles["timeline-ruler-container"]}>
      <div className={styles["timeline-ruler"]}>
        {yearList.map((year) => (
          <div key={year} className={styles["timeline-ruler-year"]}>
            <div className={styles["timeline-ruler-year-label"]}>
              Year {year}
            </div>

            <div className={styles["timeline-ruler-month-container"]}>
              {Array.from({ length: 12 }, (_, monthIndex) => (
                <div
                  key={monthIndex}
                  className={styles["timeline-ruler-month"]}
                >
                  <div className={styles["timeline-ruler-month-label"]}>
                    {monthNames[monthIndex]}
                  </div>
                  <div className={styles["timeline-ruler-day-container"]}>
                    {Array.from(
                      { length: getDaysInMonth(year, monthIndex) },
                      (_, dayIndex) => (
                        <div key={dayIndex} className={styles["timeline-ruler-day"]}>
                          <div className={styles["timeline-ruler-day-label"]}>
                            {dayIndex + 1}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
