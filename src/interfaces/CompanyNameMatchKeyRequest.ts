import { InterzoidRequest } from './InterzoidRequest';

/**
 * CompanyNameMatchKeyRequest represents the request to the CompanyNameMatchKey API.
 * @interface CompanyNameMatchKeyRequest
 * @extends {InterzoidRequest}
 * @property {string} company - Company name to match
 * @property {string} [algorithm] - Algorithm to use for matching
 */
export interface CompanyNameMatchKeyRequest extends InterzoidRequest {
  company: string;
  algorithm?: 'wide' | 'medium' | 'narrow';
}
