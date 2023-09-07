import { MatchScoreRequest } from '../interfaces/MatchScoreRequest';
import { MatchScoreResponse } from '../interfaces/MatchScoreResponse';
import { InterzoidApi } from './InterzoidApi';

/**
 * This API provides a match score (likelihood of matching) between two individual names on a scale of 0-100, where 100 is the highest possible match.
 * @param {MatchScoreRequest} request
 * @returns {Promise<MatchScoreResponse>}
 */
export async function getFullNameMatchScore(
  request: MatchScoreRequest,
): Promise<MatchScoreResponse> {
  // Validate request
  if (!isValidFullNameMatchScoreRequest(request)) {
    throw new Error(
      'Invalid request. "apiKey", "value1" and "value2" are required.',
    );
  }
  const resource = 'getfullnamematchscore';

  const resp = await InterzoidApi.doGetRequest(resource, request.apiKey, {
    fullname1: request.value1,
    fullname2: request.value2,
  });
  return resp as MatchScoreResponse;
}

function isValidFullNameMatchScoreRequest(obj: any): obj is MatchScoreRequest {
  return (
    obj &&
    typeof obj.value1 === 'string' &&
    typeof obj.value2 === 'string' &&
    typeof obj.apiKey === 'string'
  );
}
