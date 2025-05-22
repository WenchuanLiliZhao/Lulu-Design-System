import React from "react";
import { TimelineItemShape } from "./TimelineItemShape";
import { TimelineItemInterval } from "./TimelineFunctions";

interface TimelineProps {
  inputData: TimelineItemShape[];
}

export const Timeline: React.FC<TimelineProps> = ({ inputData }) => {
  const yearList = TimelineItemInterval({ inputData: inputData });
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <div>
      {yearList.map((year) => (
        <div key={year}>
          Year {year} {/* Add year here, e.g., Year 2020 */}

          {Array.from({ length: 12 }, (_, monthIndex) => (
            <div key={monthIndex}>
              - {monthNames[monthIndex]}
              {Array.from({ length: getDaysInMonth(year, monthIndex) }, (_, dayIndex) => (
                <div key={dayIndex}>
                  - - {dayIndex + 1}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
