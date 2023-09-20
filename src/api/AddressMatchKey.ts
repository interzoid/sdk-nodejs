import { MatchKeyResponse } from '../interfaces/MatchKeyResponse';
import { AddressMatchKeyRequest } from '../interfaces/AddressMatchKeyRequest';
import { InterzoidApi } from './InterzoidApi';

/**
 * This API provides a hashed similarity key from the input data used to match w
 * ith other similar address data. Use the generated similarity key, rather than
 * the actual data itself, to match and/or sort address data by similarity.
 * This avoids the problems of data inconsistency, misspellings, and address element
 * variations when matching either withing a single dataset, or across datasets.
 * It also provides for broader searching capabilities.
 * @param {AddressMatchKeyRequest} request - Request object
 * @returns {Promise<MatchKeyResponse>} - Response object
 */
export async function getAddressMatchKey(
  request: AddressMatchKeyRequest,
): Promise<MatchKeyResponse> {
  // Validate request
  if (!isValidAddressMatchKeyRequest(request)) {
    throw new Error('Invalid request. "apiKey" and "address" are required.');
  }

  const algorithm = request.algorithm || 'narrow';
  const resource = 'getaddressmatchadvanced';

  const resp = await InterzoidApi.doApiGetRequest(resource, request.apiKey, {
    address: request.address,
    algorithm: algorithm,
  });
  return resp as MatchKeyResponse;
}

/**
 * Validate AddressMatchKeyRequest
 * @param obj
 * @returns {obj is AddressMatchKeyRequest}
 */
function isValidAddressMatchKeyRequest(
  obj: any,
): obj is AddressMatchKeyRequest {
  return (
    obj && typeof obj.address === 'string' && typeof obj.apiKey === 'string'
  );
}
