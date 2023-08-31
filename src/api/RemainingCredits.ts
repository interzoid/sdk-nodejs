import { InterzoidResponse } from '../interfaces/InterzoidResponse';
import { InterzoidApi } from './InterzoidApi';
import { InterzoidRequest } from '../interfaces/InterzoidRequest';

export async function getRemainingCredits(
  request: InterzoidRequest,
): Promise<InterzoidResponse> {
  return InterzoidApi.doGetRequest('getremainingcredits', request.apiKey);
}
