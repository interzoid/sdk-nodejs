import { MatchScoreRequest } from '../interfaces/MatchScoreRequest'
import { MatchScoreResponse } from '../interfaces/MatchScoreResponse'
import { InterzoidApi } from './InterzoidApi'

export async function getNameMatchScore(
  request: MatchScoreRequest,
): Promise<MatchScoreResponse> {
  const resource = 'getfullnamematchscore';

  const resp = await InterzoidApi.doGetRequest(resource, request.apiKey, {
    fullname1: request.value1,
    fullname2: request.value2,
  });
  return resp as MatchScoreResponse;
}
