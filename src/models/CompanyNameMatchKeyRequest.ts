/** @interface CompanyNameMatchKeyRequest */
export interface CompanyNameMatchKeyRequest {
  /**
   * The company name to generate a match key for
   * @name companyName
   * */
  companyName: string;

  /**
   * The API key to use to make the request
   * @name apiKey
   * */
  apiKey: string;

  /**
   * You can choose from multiple matching algorithms, "wide", "medium", and "narrow".
   * "Wide" will find a greater number of matches, but may also find similarly-spelled
   * false positives. "Narrow" will result in tighter matching requirements, but
   * then may miss a few matches.
   * @name algorithm
   * @default "wide"
   */
  algorithm?: 'wide' | 'medium' | 'narrow';
}
