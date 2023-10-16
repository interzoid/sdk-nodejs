/**
 * Represents an individual item in a match cluster.
 * @interface MatchClusterItem
 * @property {string} Data - The data
 * @property {string} Reference - The reference
 * @property {string} SimKey - The similarity key
 */
export interface MatchClusterItem {
  Data: string;
  Reference: string;
  SimKey: string;
}

/**
 * Represents a group of related match cluster items.
 * @type MatchCluster - An array of {MatchClusterItem}
 */
export type MatchCluster = MatchClusterItem[];
