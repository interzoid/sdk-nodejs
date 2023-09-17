import { MatchScoreRequest } from '../interfaces/MatchScoreRequest';
import { MatchScoreResponse } from '../interfaces/MatchScoreResponse';
import { InterzoidApi } from './InterzoidApi';

/**
 * This API provides a match score (likelihood of matching) from 0-100 between two organization names.
 * @param {MatchScoreRequest} request - Request object
 * @returns {Promise<MatchScoreResponse>} - Response object
 */
export async function getOrganizationMatchScore(
  request: MatchScoreRequest,
): Promise<MatchScoreResponse> {
  // Validate request
  if (!isValidOrganizationMatchScoreRequest(request)) {
    throw new Error(
      'Invalid request. "apiKey", "value1" and "value2" are required.',
    );
  }
  const resource = 'getorgmatchscore';

  const resp = await InterzoidApi.doGetRequest(resource, request.apiKey, {
    org1: request.value1,
    org2: request.value2,
  });
  return resp as MatchScoreResponse;
}

/**
 * Validate MatchScoreRequest
 * @param obj
 */
function isValidOrganizationMatchScoreRequest(
  obj: any,
): obj is MatchScoreRequest {
  return (
    obj &&
    typeof obj.value1 === 'string' &&
    typeof obj.value2 === 'string' &&
    typeof obj.apiKey === 'string'
  );
}
