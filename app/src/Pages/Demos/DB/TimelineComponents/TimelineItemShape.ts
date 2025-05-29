export interface IssueType {
  id: string;
  name: string;
  status: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  children?: IssueType[];
}

export const sortTimelineItemsByStartDate = (items: IssueType[]): IssueType[] => {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};


export const Example_TimelineItems: IssueType[] = [
  {
    id: "MATH001",
    name: "Interactive Calculus Workshop",
    status: "In Progress",
    description: "Develop and implement an interactive workshop series for advanced calculus concepts using real-world applications",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2029-06-30"),
    progress: 45
  },
  {
    id: "MATH002",
    name: "Algebra Fundamentals Program",
    status: "Planning",
    description: "Create a comprehensive program to strengthen basic algebra skills for high school students",
    startDate: new Date("2024-04-15"),
    endDate: new Date("2024-08-15"),
    progress: 20
  },
  {
    id: "MATH003",
    name: "Statistics for Data Science",
    status: "Not Started",
    description: "Design a specialized course bridging traditional statistics with modern data science applications",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-12-31"),
    progress: 0
  },
  {
    id: "MATH004",
    name: "Geometry Visualization Lab",
    status: "In Progress",
    description: "Establish a digital lab for 3D geometry visualization and interactive learning",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-07-31"),
    progress: 60
  },
  {
    id: "MATH005",
    name: "Math Olympiad Training",
    status: "Active",
    description: "Develop and implement an intensive training program for mathematics competition preparation",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    progress: 75
  },
  {
    id: "MATH006",
    name: "Applied Mathematics Workshop",
    status: "Planning",
    description: "Create workshops focusing on practical applications of mathematics in engineering and science",
    startDate: new Date("2029-06-01"),
    endDate: new Date("2024-11-30"),
    progress: 15
  },
  {
    id: "MATH007",
    name: "Mathematics Learning Center",
    status: "In Progress",
    description: "Establish a dedicated center for personalized mathematics tutoring and support",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-09-15"),
    progress: 40
  },
  {
    id: "MATH008",
    name: "Financial Mathematics Course",
    status: "Not Started",
    description: "Develop a specialized course covering financial mathematics and quantitative analysis",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-12-31"),
    progress: 0
  },
  {
    id: "MATH009",
    name: "Mathematics Teaching Certification",
    status: "Active",
    description: "Create a certification program for mathematics educators focusing on modern teaching methodologies",
    startDate: new Date("2023-12-30"),
    endDate: new Date("2024-01-01"),
    progress: 55
  },
  {
    id: "MATH010",
    name: "Mathematics Research Symposium",
    status: "Planning",
    description: "Organize an annual symposium for mathematics educators to share research and best practices",
    startDate: new Date("2024-05-15"),
    endDate: new Date("2024-10-15"),
    progress: 25
  }
];


