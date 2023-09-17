import { InterzoidResponse } from '../interfaces/InterzoidResponse';
import { InterzoidApi } from './InterzoidApi';
import { InterzoidRequest } from '../interfaces/InterzoidRequest';

/**
 * This API retrieves the current amount of remaining purchased (or trial) credits for a license key.
 * @param {InterzoidRequest} request - The request object
 * @returns {Promise<InterzoidResponse>} - The response object
 */
export async function getAccountInfo(
  request: InterzoidRequest,
): Promise<InterzoidResponse> {
  return InterzoidApi.doGetRequest('getremainingcredits', request.apiKey);
}
