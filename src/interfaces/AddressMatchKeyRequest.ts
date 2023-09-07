import { InterzoidRequest } from './InterzoidRequest';

export interface AddressMatchKeyRequest extends InterzoidRequest {
  address: string;
  algorithm?: 'wide' | 'narrow';
}
