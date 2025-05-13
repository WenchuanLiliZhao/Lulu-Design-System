import React, { useState } from "react";
import styles from "./CheckBoxTree.module.scss";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface CheckBoxTreeProps {
  data: TreeNode[];
  onChange?: (selectedIds: string[]) => void;
}

export const CheckBoxTree: React.FC<CheckBoxTreeProps> = ({ data, onChange }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const isSelected = prev.includes(id);
      const newSelectedIds = isSelected
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      if (onChange) {
        onChange(newSelectedIds);
      }

      return newSelectedIds;
    });
  };

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <div key={node.id} className={styles["tree-node"]}>
        <label>
          <input
            type="checkbox"
            checked={selectedIds.includes(node.id)}
            onChange={() => handleToggle(node.id)}
          />
          {node.label}
        </label>
        {node.children && (
          <div className={styles["tree-children"]}>{renderTree(node.children)}</div>
        )}
      </div>
    ));
  };

  return <div className={styles["check-box-tree"]}>{renderTree(data)}</div>;
};
