import { InterzoidRequest } from './InterzoidRequest';

export interface AddressMatchKeyRequest extends InterzoidRequest {
  address: string;
  /**
   * You can choose from multiple matching algorithms, "wide", "medium", and "narrow".
   * "Wide" will find a greater number of matches, but may also find similarly-spelled
   * false positives. "Narrow" will result in tighter matching requirements, but
   * then may miss a few matches.
   * @default "narrow"
   */
  algorithm?: 'wide' | 'medium' | 'narrow';
}
