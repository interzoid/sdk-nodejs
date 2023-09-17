import { InterzoidRequest } from './InterzoidRequest';

/**
 * FullNameMatchKeyRequest represents the request to the FullNameMatchKey API.
 * @interface FullNameMatchKeyRequest
 * @extends {InterzoidRequest}
 * @property {string} fullName - Full name to match
 * @property {string} [algorithm] - Algorithm to use for matching
 */
export interface FullNameMatchKeyRequest extends InterzoidRequest {
  fullName: string;
}
