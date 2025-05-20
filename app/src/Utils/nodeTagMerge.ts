import { TreeNodesShape } from '../Components/Tree/TreeExplorer';

/**
 * Transforms a TreeNodesShape[] into a string[][] by extracting tags by level.
 * For each level k, we calculate Sk which is the set of tags at level k
 * that don't appear in any previous level.
 * 
 * @param nodes - The TreeNodesShape array to process
 * @returns A string[][] array where each element is an array of tags for a level
 */
export function nodeTagMerge(nodes: TreeNodesShape[]): string[][] {
  // Get maximum depth of the tree
  const maxDepth = getMaxDepth(nodes);
  
  // Initialize arrays to store all tags at each level (T sets)
  const tagsByLevel: Set<string>[] = Array(maxDepth + 1)
    .fill(null)
    .map(() => new Set<string>());
  
  // Collect all tags at each level (T0, T1, T2, ...)
  collectTagsByLevel(nodes, tagsByLevel, 0);
  
  // Calculate S sets, where S0 = T0 and Sk+1 = Tk+1 \ Tk for k>=0
  const result: string[][] = [];
  
  // S0 is simply all tags in level 0 (T0)
  result[0] = Array.from(tagsByLevel[0]);
  
  // For each subsequent level, calculate Sk+1 = Tk+1 \ Tk
  // We'll build a cumulative set of all tags seen so far
  const allPreviousTags = new Set<string>(tagsByLevel[0]);
  
  for (let k = 1; k <= maxDepth; k++) {
    const currentLevelTags = tagsByLevel[k];
    const newTags: string[] = [];
    
    // Find tags at current level that don't exist in previous levels
    currentLevelTags.forEach(tag => {
      if (!allPreviousTags.has(tag)) {
        newTags.push(tag);
        // Add to all previous tags for next iteration
        allPreviousTags.add(tag);
      }
    });
    
    // Add the new tags as Sk
    result[k] = newTags;
  }
  
  return result;
}

/**
 * Helper function to get the maximum depth of a TreeNodesShape array
 */
function getMaxDepth(nodes: TreeNodesShape[]): number {
  if (!nodes || nodes.length === 0) {
    return 0;
  }
  
  let maxDepth = 0;
  
  for (const node of nodes) {
    const childDepth = node.children ? getMaxDepth(node.children) : 0;
    maxDepth = Math.max(maxDepth, childDepth + 1);
  }
  
  return maxDepth;
}

/**
 * Helper function to collect tags at each level of the tree
 */
function collectTagsByLevel(
  nodes: TreeNodesShape[],
  tagsByLevel: Set<string>[],
  level: number
): void {
  if (!nodes || nodes.length === 0) {
    return;
  }
  
  for (const node of nodes) {
    // Add tags from this node to the appropriate level set
    const tags = node.page.info.tags || [];
    for (const tag of tags) {
      tagsByLevel[level].add(tag);
    }
    
    // Process children recursively
    if (node.children && node.children.length > 0) {
      collectTagsByLevel(node.children, tagsByLevel, level + 1);
    }
  }
}