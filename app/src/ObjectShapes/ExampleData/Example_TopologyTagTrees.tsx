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
          },
          {
            id: "closed-sets",
            type: "tag",
            name: "Closed Sets",
            children: [],
          },
          {
            id: "basis-for-a-topology",
            type: "tag",
            name: "Basis for a Topology",
            children: [],
          },
        ],
      },
      {
        id: "topological-properties",
        type: "tag",
        name: "Topological Properties",
        children: [],
      },
      {
        id: "topological-structures",
        type: "tag",
        name: "Topological Structures",
        children: [],
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
          },
          {
            id: "choice-axiom",
            type: "tag",
            name: "Axiom of Choice",
            children: [],
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
          },
          {
            id: "relations-and-functions",
            type: "tag",
            name: "Relations and Functions",
            children: [],
          },
        ],
      },
    ],
  },
];

export const Example_TopologyTagTrees = {
  Math,
};
