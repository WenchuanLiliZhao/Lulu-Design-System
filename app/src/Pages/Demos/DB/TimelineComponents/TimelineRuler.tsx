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

/**
 * Represents the result of placing a timeline item in a specific column
 * @property column - The vertical position (0-based) where the item should be placed
 * @property item - The timeline item being placed
 * @property startDate - Cached start date to avoid repeated Date object creation
 * @property endDate - Cached end date to avoid repeated Date object creation
 */
interface PlacementResult {
  column: number;
  item: TimelineItemShape;
  startDate: Date;
  endDate: Date;
}

export const TimelineRuler: React.FC<TimelineProps> = ({ inputData }) => {
  // Sort items by start date to ensure consistent placement
  const sortedItems = sortTimelineItemsByStartDate(inputData);
  // Get list of years that need to be displayed
  const yearList = TimelineItemInterval({ inputData: sortedItems });

  // Constants for layout calculations
  const itemVGap = 4;
  const dayWidth = 24; // Width of each day cell in pixels
  const cellHeight = 48; // Height of each item row in pixels

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  /**
   * Calculate the number of days in a specific month
   * @param year - The year to check
   * @param month - The month to check (0-based)
   * @returns The number of days in the specified month
   */
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  /**
   * Calculate the duration between two dates, inclusive of both start and end dates
   * Example: 2023-12-30 to 2024-01-01 = 3 days (30th, 31st, 1st)
   * 
   * @param startDate - The start date of the period
   * @param endDate - The end date of the period
   * @returns The number of days between the dates, including both start and end dates
   */
  const calculateDurationInDays = (startDate: Date, endDate: Date): number => {
    // Reset the time part to avoid time zone issues
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    
    // Add 1 to include both start and end dates
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  /**
   * Find the appropriate column (vertical position) for a new timeline item
   * Implementation of the placement algorithm:
   * - First item (k=0) goes in first column (p=0)
   * - For each subsequent item (k+1), find minimum column p where there's no overlap
   * 
   * @param placements - List of all previous item placements
   * @param _currentItem - The item being placed (unused, prefixed with _ to indicate)
   * @param currentStartDate - Start date of the item being placed
   * @param currentEndDate - End date of the item being placed
   * @returns The column number where the item should be placed
   */
  const findPlacement = (
    placements: PlacementResult[],
    _currentItem: TimelineItemShape,
    currentStartDate: Date,
    currentEndDate: Date
  ): number => {
    // First item always goes in column 0
    if (placements.length === 0) return 0;

    // Find the highest column number currently in use
    const maxColumn = Math.max(...placements.map(p => p.column));
    
    // Try each column from 0 up to maxColumn + 1
    for (let col = 0; col <= maxColumn + 1; col++) {
      // Get all items already placed in this column
      const itemsInColumn = placements.filter(p => p.column === col);
      
      // Check if current item can fit in this column
      const isColumnAvailable = itemsInColumn.every(placement => {
        // Items overlap if one starts before the other ends
        // Note: Using strict inequality (<, >) to treat same-day items as overlapping
        return currentEndDate < placement.startDate || currentStartDate > placement.endDate;
      });

      // If we found a column with no overlaps, use it
      if (isColumnAvailable) {
        return col;
      }
    }

    // If no existing column works, create a new one
    return maxColumn + 1;
  };

  // Reusable column component for consistent styling
  const Column = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles["timeline-ruler-column"]}>{children}</div>;
  };

  // Pre-calculate all item placements
  const allPlacements: PlacementResult[] = [];
  sortedItems.forEach((item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    
    const column = findPlacement(allPlacements, item, startDate, endDate);
    
    allPlacements.push({
      column,
      item,
      startDate,
      endDate
    });
  });

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
                            {allPlacements.map((placement) => {
                              const itemStartDate = placement.startDate;
                              const itemStartYear = itemStartDate.getFullYear();
                              const itemStartMonth = itemStartDate.getMonth();
                              const itemStartDay = itemStartDate.getDate();

                              // Only render item if it starts on this exact day
                              if (
                                itemStartYear === year &&
                                itemStartMonth === monthIndex &&
                                itemStartDay === dayIndex + 1
                              ) {
                                const durationInDays = calculateDurationInDays(
                                  itemStartDate,
                                  placement.endDate
                                );

                                return (
                                  <div
                                    key={placement.item.id}
                                    className={styles["timeline-item"]}
                                    style={{
                                      height: cellHeight,
                                      marginLeft: `${itemVGap / 2}px`,
                                      width: `${durationInDays * dayWidth - itemVGap - 1}px`,
                                      position: "absolute",
                                      top: `${itemVGap + placement.column * (cellHeight + itemVGap)}px`, // 4px gap between rows
                                    }}
                                  >
                                    <div className={styles["timeline-item-name"]}>
                                      {placement.item.name}
                                    </div>
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
