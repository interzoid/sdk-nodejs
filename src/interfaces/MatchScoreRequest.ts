import { InterzoidRequest } from './InterzoidRequest';

/**
 * MatchScoreRequest represents the request to the MatchScore API.
 * @interface MatchScoreRequest
 * @extends {InterzoidRequest}
 * @property {string} value1 - First value to match
 */
export interface MatchScoreRequest extends InterzoidRequest {
  value1: string;
  value2: string;
}
