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
  algorithm?:
    | 'narrow'
    | 'wide'
    | 'ai-plus-narrow'
    | 'ai-plus-wide'
    | 'ai-medium-narrow'
    | 'ai-medium-wide';
}
