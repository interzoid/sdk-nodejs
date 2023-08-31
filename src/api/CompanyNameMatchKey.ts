import { MatchKeyResponse } from '../interfaces/MatchKeyResponse';
import { CompanyNameMatchKeyRequest } from '../interfaces/CompanyNameMatchKeyRequest';
import { InterzoidApi } from './InterzoidApi';

/**
 * This API provides a hashed similarity key from the input data used to match
 * with other similar full name data. Use the generated similarity key, rather
 * than the actual data itself, to match and/or sort individual name data by
 * similarity. This avoids the problems of data inconsistency, misspellings, and
 * name variations when matching within a single dataset, and can also help
 * matching across datasets or for more advanced searching.
 * https://www.interzoid.com/apis/company-name-matching
 * @param {FullNameMatchKeyRequest} request
 * @returns {Promise<MatchKeyResponse>}
 */
export async function getCompanyNameMatchKey(
  request: CompanyNameMatchKeyRequest,
): Promise<MatchKeyResponse> {
  const resource = 'getcompanymatchadvanced';
  const algorithm = request.algorithm || 'wide';

  const resp = await InterzoidApi.doGetRequest(resource, request.apiKey, {
    company: request.company,
    algorithm: algorithm,
  });
  return resp as MatchKeyResponse;
}
