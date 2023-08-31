import { MatchScoreRequest } from '../interfaces/MatchScoreRequest'
import { MatchScoreResponse } from '../interfaces/MatchScoreResponse'
import { InterzoidApi } from './InterzoidApi'

export async function getOrganizationMatchScore(
  request: MatchScoreRequest,
): Promise<MatchScoreResponse> {
  const resource = 'getorgmatchscore';

  const resp = await InterzoidApi.doGetRequest(resource, request.apiKey, {
    org1: request.value1,
    org2: request.value2,
  });
  return resp as MatchScoreResponse;
}
