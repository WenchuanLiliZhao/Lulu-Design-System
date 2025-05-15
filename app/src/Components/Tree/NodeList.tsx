import stypes from "./NodeList.module.scss";
import React from "react";
import { NodeShape } from "./TreeExplorer";

export const NodeTagPrefix = "node-tag-";

export const NodeList: React.FC<{ tree: NodeShape[] }> = ({ tree }) => {
  return (
    <>
      {tree.map((node) => {
        const tags = node.tags
          ? node.tags.map((tag) => `${NodeTagPrefix}-${tag}`).join(", ")
          : "";

        const level = node.level ? node.level : 0;

        return (
          <React.Fragment key={node.id}>
            <div
              className={`
                ${stypes["node"]}
                ${tags}
              `}
              aria-label={`Tags: ${tags}`}
              style={{ marginLeft: `${level * 20 + 20}px` }}
            >
              {node.name}
            </div>
            {node.children && node.children.length > 0 && (
              <NodeList tree={node.children} />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
