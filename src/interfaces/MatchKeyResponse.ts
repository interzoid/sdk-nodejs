import { InterzoidResponse } from './InterzoidResponse';

/**
 * Interface for MatchKey API response
 * @interface MatchKeyResponse
 * @extends {InterzoidResponse}
 * @property {string} simKey - The similarity key
 */
export interface MatchKeyResponse extends InterzoidResponse {
  simKey: string;
}
