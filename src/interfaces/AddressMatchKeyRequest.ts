import { InterzoidRequest } from './InterzoidRequest';

/**
 * AddressMatchKeyRequest represents the request to the AddressMatchKey API.
 * @interface AddressMatchKeyRequest
 * @extends {InterzoidRequest}
 * @property {string} address - Address to match
 * @property {string} [algorithm] - Algorithm to use for matching
 */
export interface AddressMatchKeyRequest extends InterzoidRequest {
  address: string;
  algorithm?: 'wide' | 'narrow';
}
