import { MatchCluster } from './MatchCluster';

/**
 * CsvMatchKeyReportResponse represents the response from the CSV Match Key Report API.
 * @interface DelimitedFileMatchKeyReportResponse
 * @property {string} Status - The response code
 * @property {string} Message - The response message
 * @property {MatchCluster[]} MatchClusters - The match clusters
 */
export interface DelimitedFileMatchKeyReportResponse {
  Status: string;
  Message: string;
  MatchClusters: MatchCluster[];
}
