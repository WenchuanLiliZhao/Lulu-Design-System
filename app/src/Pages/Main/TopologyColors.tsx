import { PageShape } from "../../ObjectShapes/PageShape";
import { nodeGroupColors } from "../../Components/Tree/NetworkTopology/Elements/nodeGroupColors";
import styles from "./TopologyColors.module.scss";

const TopologyColors: PageShape = {
  info: {
    slug: "topology-colors",
    title: "Topology Colors",
    title_display: "Topology Node Colors",
    date: new Date("2025-04-24"),
    type: "page",
  },
  content: (
    <div className={styles["topology-colors-container"]}>
      <div className={styles["header"]}>
        <h1>Topology Node Colors</h1>
        <p>This page displays all the colors used for Topology nodes, optimized for maximum visual distinctiveness and accessibility.</p>
      </div>
      
      <div className={styles["colors-grid"]}>
        {Object.entries(nodeGroupColors).map(([groupId, color]) => (
          <div key={groupId} className={styles["color-item"]}>
            <div 
              className={styles["color-preview"]} 
              style={{ backgroundColor: color }}
            ></div>
            <div className={styles["color-info"]}>
              <div className={styles["color-name"]}>
                Group {groupId}
              </div>
              <div className={styles["color-hex"]}>
                {color}
              </div>
              <div className={styles["color-description"]}>
                {getColorDescription(parseInt(groupId))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles["usage-info"]}>
        <h2>Usage Information</h2>
        <p>
          These colors are used in the Network Topology component to differentiate node groups. 
          Each node group is assigned a specific color from this palette to enhance visual 
          distinction and improve user experience when exploring complex network structures.
        </p>
        <p>
          The color scheme is carefully optimized to ensure each color is visually distinct, 
          improving user experience when analyzing complex network relationships with many node groups.
        </p>
      </div>
    </div>
  ),
};

function getColorDescription(groupId: number): string {
  const descriptions: Record<number, string> = {
    0: 'Coral Red',
    1: 'Turquoise', 
    2: 'Sky Blue',
    3: 'Mint Green',
    4: 'Golden Yellow',
    5: 'Pink',
    6: 'Royal Blue',
    7: 'Deep Purple',
    8: 'Cyan',
    9: 'Orange',
    10: 'Magenta',
    11: 'Dark Blue',
    12: 'Lavender',
    13: 'Amber',
    14: 'Lime Green',
    15: 'Deep Orange',
    16: 'Brown',
    17: 'Blue Grey',
    18: 'Deep Pink',
    19: 'Indigo',
  };
  
  return descriptions[groupId] || 'Unknown Color';
}

export default TopologyColors; 