import { NodeShape } from "../../Components/Tree/TreeExplorer";

const Math: NodeShape[] = [
  {
    id: "general-topology",
    type: "tag",
    name: "General Topology",
    children: [
      {
        id: "topological-spaces",
        type: "tag",
        name: "Topological Spaces",
        children: [
          {
            id: "open-sets",
            type: "tag",
            name: "Open Sets",
            children: [],
            fileCount: 127,
          },
          {
            id: "closed-sets",
            type: "tag",
            name: "Closed Sets",
            children: [],
            fileCount: 89,
          },
          {
            id: "basis-for-a-topology",
            type: "tag",
            name: "Basis for a Topology",
            children: [],
            fileCount: 156,
          },
        ],
      },
      {
        id: "topological-properties",
        type: "tag",
        name: "Topological Properties",
        children: [],
        fileCount: 203,
      },
      {
        id: "topological-structures",
        type: "tag",
        name: "Topological Structures",
        children: [],
        fileCount: 74,
      },
    ],
  },

  {
    id: "set-theory",
    type: "tag",
    name: "Set Theory",
    children: [
      {
        id: "axiomatic-set-theory",
        type: "tag",
        name: "Axiomatic Set Theory",
        children: [
          {
            id: "zermelo-fraenkel-set-theory",
            type: "tag",
            name: "Zermelo-Fraenkel Set Theory",
            children: [],
            fileCount: 142,
          },
          {
            id: "choice-axiom",
            type: "tag",
            name: "Axiom of Choice",
            children: [],
            fileCount: 98,
          },
        ],
      },
      {
        id: "naive-set-theory",
        type: "tag",
        name: "Naive Set Theory",
        children: [
          {
            id: "set-operations",
            type: "tag",
            name: "Set Operations",
            children: [],
            fileCount: 185,
          },
          {
            id: "relations-and-functions",
            type: "tag",
            name: "Relations and Functions",
            children: [],
            fileCount: 267,
          },
        ],
      },
    ],
  },
];

export const Example_TopologyTagTrees = {
  Math,
};
