import { MatchCluster } from './MatchCluster';

export interface CloudWorkloadResponse {
  Status: string;
  Message: string;
  MatchClusters?: MatchCluster[];
}
