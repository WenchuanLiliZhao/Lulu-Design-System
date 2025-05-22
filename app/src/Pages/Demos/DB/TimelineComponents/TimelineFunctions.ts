import { TimelineItemShape } from "./TimelineItemShape";

interface TimelineItemIntervalProps {
  inputData: TimelineItemShape[];
}

export function TimelineItemInterval({ inputData }: TimelineItemIntervalProps) {
  const earliestStartDate = inputData.reduce((earliest, item) => {
    return item.startDate < earliest ? item.startDate : earliest;
  }, inputData[0].startDate);

  const latestEndDate = inputData.reduce((latest, item) => {
    return item.endDate > latest ? item.endDate : latest;
  }, inputData[0].endDate);

  const earliestYear = earliestStartDate.getFullYear();

  const lastYear = latestEndDate.getFullYear();

  const years = [];
  for (let year = earliestYear; year <= lastYear; year++) {
    years.push(year);
  }

  return years;
}
