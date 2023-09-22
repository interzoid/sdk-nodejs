/**
 * Represents an individual item in a match cluster.
 * @interface MatchClusterItem
 * @property {string} Data - The data
 * @property {string} Reference - The reference
 * @property {string} SimKey - The similarity key
 */
interface MatchClusterItem {
  Data: string;
  Reference: string;
  SimKey: string;
}

/**
 * Represents a group of related match cluster items.
 * @type MatchCluster - An array of {MatchClusterItem}
 */
type MatchCluster = MatchClusterItem[];

/**
 * CsvMatchKeyReportResponse represents the response from the CSV Match Key Report API.
 * @interface CsvMatchKeyReportResponse
 * @property {string} Status - The response code
 * @property {string} Message - The response message
 * @property {MatchCluster[]} MatchClusters - The match clusters
 */
export interface CsvMatchKeyReportResponse {
  Status: string;
  Message: string;
  MatchClusters: MatchCluster[];
}
