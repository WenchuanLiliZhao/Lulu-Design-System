import { TreeNodesType } from "../TreeNodeType";

const Math: TreeNodesType[] = [
  {
    page: {
      info: {
        slug: "set_theory",
        title: "Set Theory",
        date: new Date("2025-10-01"),
      },
      content: <div>Set Theory</div>,
    },
    children: [
      {
        page: {
          info: {
            slug: "axiom_of_extensionality",
            title: "Axiom of Extensionality",
            date: new Date("2025-03-14"),
          },
          content: <div>Axiom of Extensionality</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "definition_of_set",
                title: "Definition of Set",
                date: new Date("2025-04-01"),
              },
              content: <div>Definition of Set</div>,
            },
            children: [
              {
                page: {
                  info: {
                    slug: "examples_of_sets",
                    title: "Examples of Sets",
                    date: new Date("2025-04-02"),
                  },
                  content: <div>Examples of Sets</div>,
                },
                children: [],
              },
              {
                page: {
                  info: {
                    slug: "properties_of_sets",
                    title: "Properties of Sets",
                    date: new Date("2025-04-03"),
                  },
                  content: <div>Properties of Sets</div>,
                },
                children: [],
              },
            ],
          },
          {
            page: {
              info: {
                slug: "axiom_of_choice",
                title: "Axiom of Choice",
                date: new Date("2025-04-10"),
              },
              content: <div>Axiom of Choice</div>,
            },
            children: [
              {
                page: {
                  info: {
                    slug: "applications_of_axiom_of_choice",
                    title: "Applications of Axiom of Choice",
                    date: new Date("2025-04-11"),
                  },
                  content: <div>Applications of Axiom of Choice</div>,
                },
                children: [],
              },
              {
                page: {
                  info: {
                    slug: "controversies_about_axiom_of_choice",
                    title: "Controversies About Axiom of Choice",
                    date: new Date("2025-04-12"),
                  },
                  content: <div>Controversies About Axiom of Choice</div>,
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        page: {
          info: {
            slug: "union_and_intersection",
            title: "Union and Intersection",
            date: new Date("2025-05-01"),
          },
          content: <div>Union and Intersection</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "union_of_sets",
                title: "Union of Sets",
                date: new Date("2025-05-02"),
              },
              content: <div>Union of Sets</div>,
            },
            children: [
              {
                page: {
                  info: {
                    slug: "examples_of_union",
                    title: "Examples of Union",
                    date: new Date("2025-05-03"),
                  },
                  content: <div>Examples of Union</div>,
                },
                children: [],
              },
              {
                page: {
                  info: {
                    slug: "properties_of_union",
                    title: "Properties of Union",
                    date: new Date("2025-05-04"),
                  },
                  content: <div>Properties of Union</div>,
                },
                children: [],
              },
            ],
          },
          {
            page: {
              info: {
                slug: "intersection_of_sets",
                title: "Intersection of Sets",
                date: new Date("2025-05-05"),
              },
              content: <div>Intersection of Sets</div>,
            },
            children: [
              {
                page: {
                  info: {
                    slug: "examples_of_intersection",
                    title: "Examples of Intersection",
                    date: new Date("2025-05-06"),
                  },
                  content: <div>Examples of Intersection</div>,
                },
                children: [],
              },
              {
                page: {
                  info: {
                    slug: "properties_of_intersection",
                    title: "Properties of Intersection",
                    date: new Date("2025-05-07"),
                  },
                  content: <div>Properties of Intersection</div>,
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        page: {
          info: {
            slug: "cartesian_product",
            title: "Cartesian Product",
            date: new Date("2025-06-01"),
          },
          content: <div>Cartesian Product</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "definition_of_cartesian_product",
                title: "Definition of Cartesian Product",
                date: new Date("2025-06-02"),
              },
              content: <div>Definition of Cartesian Product</div>,
            },
            children: [
              {
                page: {
                  info: {
                    slug: "examples_of_cartesian_product",
                    title: "Examples of Cartesian Product",
                    date: new Date("2025-06-03"),
                  },
                  content: <div>Examples of Cartesian Product</div>,
                },
                children: [],
              },
              {
                page: {
                  info: {
                    slug: "properties_of_cartesian_product",
                    title: "Properties of Cartesian Product",
                    date: new Date("2025-06-04"),
                  },
                  content: <div>Properties of Cartesian Product</div>,
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        page: {
          info: {
            slug: "power_set",
            title: "Power Set",
            date: new Date("2025-07-01"),
          },
          content: <div>Power Set</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "definition_of_power_set",
                title: "Definition of Power Set",
                date: new Date("2025-07-02"),
              },
              content: <div>Definition of Power Set</div>,
            },
            children: [
              {
                page: {
                  info: {
                    slug: "examples_of_power_set",
                    title: "Examples of Power Set",
                    date: new Date("2025-07-03"),
                  },
                  content: <div>Examples of Power Set</div>,
                },
                children: [],
              },
              {
                page: {
                  info: {
                    slug: "properties_of_power_set",
                    title: "Properties of Power Set",
                    date: new Date("2025-07-04"),
                  },
                  content: <div>Properties of Power Set</div>,
                },
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    page: {
      info: {
        slug: "algebra",
        title: "Algebra",
        date: new Date("2025-08-01"),
      },
      content: <div>Algebra</div>,
    },
    children: [
      {
        page: {
          info: {
            slug: "linear_algebra",
            title: "Linear Algebra",
            date: new Date("2025-08-02"),
          },
          content: <div>Linear Algebra</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "matrix_operations",
                title: "Matrix Operations",
                date: new Date("2025-08-03"),
              },
              content: <div>Matrix Operations</div>,
            },
            children: [],
          },
          {
            page: {
              info: {
                slug: "vector_spaces",
                title: "Vector Spaces",
                date: new Date("2025-08-04"),
              },
              content: <div>Vector Spaces</div>,
            },
            children: [],
          },
        ],
      },
      {
        page: {
          info: {
            slug: "abstract_algebra",
            title: "Abstract Algebra",
            date: new Date("2025-08-05"),
          },
          content: <div>Abstract Algebra</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "group_theory",
                title: "Group Theory",
                date: new Date("2025-08-06"),
              },
              content: <div>Group Theory</div>,
            },
            children: [],
          },
          {
            page: {
              info: {
                slug: "ring_theory",
                title: "Ring Theory",
                date: new Date("2025-08-07"),
              },
              content: <div>Ring Theory</div>,
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    page: {
      info: {
        slug: "geometry",
        title: "Geometry",
        date: new Date("2025-09-01"),
      },
      content: <div>Geometry</div>,
    },
    children: [
      {
        page: {
          info: {
            slug: "euclidean_geometry",
            title: "Euclidean Geometry",
            date: new Date("2025-09-02"),
          },
          content: <div>Euclidean Geometry</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "triangles",
                title: "Triangles",
                date: new Date("2025-09-03"),
              },
              content: <div>Triangles</div>,
            },
            children: [],
          },
          {
            page: {
              info: {
                slug: "circles",
                title: "Circles",
                date: new Date("2025-09-04"),
              },
              content: <div>Circles</div>,
            },
            children: [],
          },
        ],
      },
      {
        page: {
          info: {
            slug: "non_euclidean_geometry",
            title: "Non-Euclidean Geometry",
            date: new Date("2025-09-05"),
          },
          content: <div>Non-Euclidean Geometry</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "hyperbolic_geometry",
                title: "Hyperbolic Geometry",
                date: new Date("2025-09-06"),
              },
              content: <div>Hyperbolic Geometry</div>,
            },
            children: [],
          },
          {
            page: {
              info: {
                slug: "elliptic_geometry",
                title: "Elliptic Geometry",
                date: new Date("2025-09-07"),
              },
              content: <div>Elliptic Geometry</div>,
            },
            children: [],
          },
        ],
      },
    ],
  },
];

export const Example_TreeNodeMaps = {
  Math
}