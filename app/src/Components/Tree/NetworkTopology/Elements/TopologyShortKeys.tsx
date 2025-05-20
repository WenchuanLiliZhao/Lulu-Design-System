

// Helper function to check if a key event has either Ctrl or Command pressed
const isCmdOrCtrl = (event: KeyboardEvent | MouseEvent): boolean => {
  return event.metaKey || event.ctrlKey;
};

export const TopologyShortKeys = {
  RestoreAllHiddenNodes: "Escape",
  ToggleChildren: isCmdOrCtrl,
  RestoreZoom: "dblclick.zoom",
  HighlightChildren: isCmdOrCtrl, // Use the same function for highlighting children
};

// Define more specific function type for shortKey
type ShortKeyHandler = (event: KeyboardEvent | MouseEvent) => boolean;

interface TopologyShortKeyProps {
  shortKey: string | ShortKeyHandler;
  shortKeyText: string;
  description: string;
  isToolTip: boolean;
}

// Detect OS for showing appropriate shortcut text
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const modifierKey = isMac ? '⌘' : 'Ctrl';

export const TopologyShortKeyList: TopologyShortKeyProps[] = [
  {
    shortKey: TopologyShortKeys.RestoreAllHiddenNodes,
    shortKeyText: "Escape",
    description: "Restore all hidden nodes",
    isToolTip: true,
  },
  {
    shortKey: TopologyShortKeys.ToggleChildren,
    shortKeyText: `${modifierKey} + Click`,
    description: "Expand or collapse children of the selected node",
    isToolTip: true,
  },
  {
    shortKey: TopologyShortKeys.RestoreZoom,
    shortKeyText: "Double-click",
    description: "Restore zoom level",
    isToolTip: true,
  },
  {
    shortKey: TopologyShortKeys.HighlightChildren, 
    shortKeyText: `${modifierKey} + Hover`,
    description: "Highlight child nodes with reduced opacity",
    isToolTip: false,
  },
];

