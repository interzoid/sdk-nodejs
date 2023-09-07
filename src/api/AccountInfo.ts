import { InterzoidResponse } from '../interfaces/InterzoidResponse';
import { InterzoidApi } from './InterzoidApi';
import { InterzoidRequest } from '../interfaces/InterzoidRequest';

/**
 * This API retrieves the current amount of remaining purchased (or trial) credits for a license key.
 * @returns {Promise<InterzoidResponse>}
 */
export async function getAccountInfo(
  request: InterzoidRequest,
): Promise<InterzoidResponse> {
  return InterzoidApi.doGetRequest('getremainingcredits', request.apiKey);
}
