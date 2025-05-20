/* eslint-disable react-refresh/only-export-components */


export const TopologyShortKeys = {
  RestoreAllHiddenNodes: "Escape",
  ToggleChildren: "metaKey",
  RestoreZoom: "dblclick.zoom",
};

interface TopologyShortKeyProps {
  shortKey: string;
  shortKeyText: string;
  description: string;
}

export const TopologyShortKeyList: TopologyShortKeyProps[] = [
  {
    shortKey: TopologyShortKeys.RestoreAllHiddenNodes,
    shortKeyText: "Escape",
    description: "Restore all hidden nodes",
  },
  {
    shortKey: TopologyShortKeys.ToggleChildren,
    shortKeyText: "⌘ + Click",
    description: "Expand or collapse children of the selected node",
  },
  {
    shortKey: TopologyShortKeys.RestoreZoom,
    shortKeyText: "Double-click",
    description: "Restore zoom level",
  },
];

