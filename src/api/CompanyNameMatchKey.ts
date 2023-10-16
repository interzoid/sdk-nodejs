import { MatchKeyResponse } from '../interfaces/MatchKeyResponse';
import { CompanyNameMatchKeyRequest } from '../interfaces/CompanyNameMatchKeyRequest';
import { InterzoidApi } from './InterzoidApi';

/**
 * This API provides a hashed similarity key from the input data used to match with
 * other similar company name data. Use the generated similarity key, rather than
 * the actual data itself, to match and/or sort company name data to identify
 * inconsistently represented company and organization name data. This avoids the
 * problems of data inconsistency, misspellings, and name variations when matching
 * within a single dataset or across multiple data sources.
 * https://www.interzoid.com/apis/company-name-matching
 * @param {FullNameMatchKeyRequest} request - Request object
 * @returns {Promise<MatchKeyResponse>} - Response object
 */
export async function getCompanyNameMatchKey(
  request: CompanyNameMatchKeyRequest,
): Promise<MatchKeyResponse> {
  // Validate request
  if (!isValidCompanyNameMatchKeyRequest(request)) {
    throw new Error('Invalid request. "apiKey" and "company" are required.');
  }

  const resource = 'getcompanymatchadvanced';
  const algorithm = request.algorithm || 'wide';

  const resp = await InterzoidApi.doApiGetRequest(resource, request.apiKey, {
    company: request.company,
    algorithm: algorithm,
  });
  return resp as MatchKeyResponse;
}

/**
 * Validate CompanyNameMatchKeyRequest
 * @param obj
 * @returns {obj is FullNameMatchKeyRequest}
 */
function isValidCompanyNameMatchKeyRequest(
  obj: any,
): obj is CompanyNameMatchKeyRequest {
  return (
    obj && typeof obj.company === 'string' && typeof obj.apiKey === 'string'
  );
}
