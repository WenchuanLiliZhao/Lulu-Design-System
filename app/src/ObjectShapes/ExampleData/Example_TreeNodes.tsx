import { TreeNodesShape } from "../../Components/Tree/TreeExplorer";

const Math: TreeNodesShape[] = [
  {
    page: {
      info: {
        slug: "math",
        title: "Math",
        date: new Date("2025-01-01"),
        type: "database",
        tags: ["math"],
      },
      content: <div>Math</div>,
    },
    children: [
      {
        page: {
          info: {
            slug: "number_theory",
            title: "Number Theory",
            date: new Date("2025-01-01"),
            type: "database",
            tags: ["number-theory"],
          },
          content: <div>Number Theory</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "prime_numbers",
                title: "Prime Numbers",
                date: new Date("2025-01-01"),
                type: "database",
                tags: ["prime-numbers"],
                fileCount: 134,
              },
              content: <div>Prime Numbers</div>,
            },
            children: [],
          },
          {
            page: {
              info: {
                slug: "modular_arithmetic",
                title: "Modular Arithmetic",
                date: new Date("2025-01-01"),
                type: "database",
                tags: ["modular-arithmetic"],
                fileCount: 92,
              },
              content: <div>Modular Arithmetic</div>,
            },
            children: [],
          },
          {
            page: {
              info: {
                slug: "quadratic_residues",
                title: "Quadratic Residues",
                date: new Date("2025-01-01"),
                type: "database",
                tags: ["quadratic-residues"],
                fileCount: 178,
              },
              content: <div>Quadratic Residues</div>,
            },
            children: [],
          }
        ],
      },
      {
        page: {
          info: {
            slug: "set_theory",
            title: "Set Theory",
            date: new Date("2025-10-01"),
            type: "database",
            tags: ["set-theory"],
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
                type: "dataset",
                tags: ["axiomatic-set-theory"],
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
                    type: "chart",
                    tags: ["zermelo-fraenkel-set-theory"],
                  },
                  content: <div>Definition of Set</div>,
                },
                children: [
                  {
                    page: {
                      info: {
                        slug: "cdd-data-page-demo",
                        title: "Examples of Sets",
                        date: new Date("2025-04-02"),
                        type: "key",
                        tags: ["set-operations"],
                        fileCount: 65,
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
                        type: "dashboard",
                        tags: ["relations-and-functions"],
                        fileCount: 211,
                      },
                      content: <div>Properties of Sets</div>,
                    },
                    children: [],
                  },
                  {
                    page: {
                      info: {
                        slug: "examples_of_sets",
                        title: "Examples of Sets",
                        date: new Date("2025-04-04"),
                        type: "database",
                        tags: ["set-operations"],
                        fileCount: 83,
                      },
                      content: <div>Examples of Sets</div>,
                    },
                    children: [],
                  },
                  {
                    page: {
                      info: {
                        slug: "examples_of_sets_1",
                        title: "Examples of Sets 1",
                        date: new Date("2025-04-04"),
                        type: "database",
                        tags: ["set-operations"],
                        fileCount: 157,
                      },
                      content: <div>Examples of Sets</div>,
                    },
                    children: [],
                  },
                  {
                    page: {
                      info: {
                        slug: "examples_of_sets_2",
                        title: "Examples of Sets 2",
                        date: new Date("2025-04-04"),
                        type: "database",
                        tags: ["set-operations"],
                        fileCount: 109,
                      },
                      content: <div>Examples of Sets</div>,
                    },
                    children: [],
                  },
                  {
                    page: {
                      info: {
                        slug: "examples_of_sets_3",
                        title: "Examples of Sets 3",
                        date: new Date("2025-04-04"),
                        type: "database",
                        tags: ["set-operations"],
                        fileCount: 76,
                      },
                      content: <div>Examples of Sets</div>,
                    },
                    children: [],
                  },
                  {
                    page: {
                      info: {
                        slug: "examples_of_sets_4",
                        title: "Examples of Sets 4",
                        date: new Date("2025-04-04"),
                        type: "database",
                        tags: ["set-operations"],
                        fileCount: 193,
                      },
                      content: <div>Examples of Sets</div>,
                    },
                    children: [],
                  },
                  {
                    page: {
                      info: {
                        slug: "examples_of_sets_5",
                        title: "Examples of Sets 5",
                        date: new Date("2025-04-04"),
                        type: "database",
                        tags: ["set-operations"],
                        fileCount: 124,
                      },
                      content: <div>Examples of Sets</div>,
                    },
                    children: [],
                  },
                  {
                    page: {
                      info: {
                        slug: "examples_of_sets_6",
                        title: "Examples of Sets 6",
                        date: new Date("2025-04-04"),
                        type: "database",
                        tags: ["set-operations"],
                        fileCount: 68,
                      },
                      content: <div>Examples of Sets</div>,
                    },
                    children: [],
                  }
                ],
              },
              {
                page: {
                  info: {
                    slug: "axiom_of_choice",
                    title: "Axiom of Choice",
                    date: new Date("2025-04-10"),
                    type: "report",
                    tags: ["choice-axiom"],
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
                      type: "database",
                      tags: ["topological-properties"],
                      fileCount: 145,
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
                      type: "database",
                      tags: ["topological-structures"],
                      fileCount: 88,
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
                type: "dataset",
                tags: ["open-sets"],
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
                    type: "chart",
                    tags: ["closed-sets"],
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
                      type: "key",
                      tags: ["basis-for-a-topology"],
                      fileCount: 172,
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
                      type: "dashboard",
                      tags: ["general-topology"],
                      fileCount: 95,
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
                    type: "report",
                    tags: ["topological-spaces"],
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
                      type: "database",
                      tags: ["topological-properties"],
                      fileCount: 116,
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
                      type: "database",
                      tags: ["topological-structures"],
                      fileCount: 189,
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
                type: "dataset",
                tags: ["product-spaces", "binary-operations"],
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
                    type: "chart",
                    tags: ["ordered-pairs", "set-operations", "product-notation"],
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
                      type: "key",
                      tags: ["coordinate-systems", "euclidean-spaces", "graphs"],
                      fileCount: 73,
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
                      type: "dashboard",
                      tags: ["cardinality", "distributive-laws", "relations"],
                      fileCount: 164,
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
                type: "report",
                tags: ["set-operations", "combinatorics"],
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
                    type: "database",
                    tags: ["subsets", "set-notation", "cantor-theorem"],
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
                      type: "database",
                      tags: ["finite-sets", "enumeration", "binary-representation"],
                      fileCount: 207,
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
                      type: "dataset",
                      tags: ["cardinality", "set-operations", "boolean-algebra"],
                      fileCount: 131,
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
            type: "chart",
            tags: ["algebraic-structures", "equations", "functions"],
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
                type: "key",
                tags: ["matrices", "vectors", "linear-transformations"],
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
                  type: "dashboard",
                  tags: ["matrix-multiplication", "determinants", "inverses"],
                  fileCount: 184,
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
                    type: "report",
                    tags: ["basis", "dimension", "linear-independence"],
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
                type: "database",
                tags: ["groups", "rings", "fields"],
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
                    type: "database",
                    tags: ["symmetry", "permutations", "homomorphisms"],
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
                    type: "dataset",
                    tags: ["ideals", "modules", "polynomials"],
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
            type: "chart",
            tags: ["shapes", "spaces", "measurements"],
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
                type: "key",
                tags: ["planar-geometry", "axioms", "constructions"],
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
                    type: "dashboard",
                    tags: ["pythagorean-theorem", "congruence", "similarity"],
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
                    type: "report",
                    tags: ["pi", "arcs", "inscribed-angles"],
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
                type: "database",
                tags: ["curvature", "parallel-postulate", "manifolds"],
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
                    type: "database",
                    tags: ["saddle-surface", "poincare-disk", "negative-curvature"],
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
                    type: "dataset",
                    tags: ["spherical-geometry", "positive-curvature", "great-circles"],
                  },
                  content: <div>Elliptic Geometry</div>,
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
            slug: "probability_theory",
            title: "Probability Theory",
            date: new Date("2025-09-08"),
            type: "chart",
            tags: ["probability", "random-variables", "distributions"],
          },
          content: <div>Probability Theory</div>,
        },
        children: [
          {
            page: {
              info: {
                slug: "basic_probability",
                title: "Basic Probability",
                date: new Date("2025-09-09"),
                type: "key",
              },
              content: <div>Basic Probability</div>,
            },
            children: [],
          },

          {
            page: {
              info: {
                slug: "conditional_probability",
                title: "Conditional Probability",
                date: new Date("2025-09-10"),
                type: "key",
              },
              content: <div>Basic Probability</div>,
            },
            children: [],
          },
        ],
      },
    ],
  },
];

export const Example_TreeNodeMaps = {
  Math,
};
