import { InterzoidRequest } from './InterzoidRequest';

export interface CompanyNameMatchKeyRequest extends InterzoidRequest {
  company: string;

  /**
   * algorithm {string} - The matching algorithm to use
   * You can choose from multiple matching algorithms, "wide", "medium", and "narrow".
   * "Wide" will find a greater number of matches, but may also find similarly-spelled
   * false positives. "Narrow" will result in tighter matching requirements, but
   * then may miss a few matches.
   * @default "wide"
   */
  algorithm?: 'wide' | 'medium' | 'narrow';
}
