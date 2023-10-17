import { MatchKeyResponse } from '../interfaces/MatchKeyResponse';
import { FullNameMatchKeyRequest } from '../interfaces/FullNameMatchKeyRequest';
import { InterzoidApi } from './InterzoidApi';

/**
 * This API provides a hashed similarity key from the input data used to match
 * with other similar full name data. Use the generated similarity key, rather
 * than the actual data itself, to match and/or sort individual name data by
 * similarity. This avoids the problems of data inconsistency, misspellings, and
 * name variations when matching within a single dataset, and can also help
 * matching across datasets or for more advanced searching.
 * @param {FullNameMatchKeyRequest} request - Request object
 * @returns {Promise<MatchKeyResponse>} - Response object
 */
export async function getFullNameMatchKey(
  request: FullNameMatchKeyRequest,
): Promise<MatchKeyResponse> {
  // Validate request
  if (!isValidFullNameMatchKeyRequest(request)) {
    throw new Error('Invalid request. "apiKey" and "fullName" are required.');
  }

  const resource = 'getfullnamematch';

  const resp = await InterzoidApi.doApiGetRequest(resource, request.apiKey, {
    fullname: request.fullName,
  });
  return resp as MatchKeyResponse;
}

/**
 * Validate FullNameMatchKeyRequest
 * @param obj
 * @returns {FullNameMatchKeyRequest}
 */
function isValidFullNameMatchKeyRequest(
  obj: any,
): obj is FullNameMatchKeyRequest {
  return (
    obj && typeof obj.fullName === 'string' && typeof obj.apiKey === 'string'
  );
}
