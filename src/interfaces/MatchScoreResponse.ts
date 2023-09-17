import { InterzoidResponse } from './InterzoidResponse';

/**
 * Interface for MatchScore API response
 * @interface MatchScoreResponse
 * @extends {InterzoidResponse}
 * @property {string} score - The similarity score
 */
export interface MatchScoreResponse extends InterzoidResponse {
  score: string;
}
