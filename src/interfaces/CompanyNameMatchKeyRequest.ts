import { InterzoidRequest } from './InterzoidRequest';

export interface CompanyNameMatchKeyRequest extends InterzoidRequest {
  company: string;
  algorithm?: 'wide' | 'medium' | 'narrow';
}
