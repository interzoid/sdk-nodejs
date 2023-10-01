import { MatchCluster } from './MatchCluster';

/**
 * CloudWorkloadResponse interface
 * @interface CloudWorkloadResponse
 * @property {string} Status - Response status
 * @property {string} Message - Response message
 * @property {MatchCluster[]} [MatchClusters] - Match clusters
 */
export interface CloudWorkloadResponse {
  Status: string;
  Message: string;
  MatchClusters?: MatchCluster[];
}
