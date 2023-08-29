import axios, { AxiosResponse } from 'axios';
import { MatchKeyResponse } from '../models/MatchKeyResponse';
import { CompanyNameMatchKeyRequest } from '../models/CompanyNameMatchKeyRequest';

/**
 * This API provides a hashed similarity key from the input data used to match
 * with other similar full name data. Use the generated similarity key, rather
 * than the actual data itself, to match and/or sort individual name data by
 * similarity. This avoids the problems of data inconsistency, misspellings, and
 * name variations when matching within a single dataset, and can also help
 * matching across datasets or for more advanced searching.
 * @param {FullNameMatchKeyRequest} request
 * @returns {Promise<MatchKeyResponse>}
 */
export async function getFullNameMatchKey(
  request: CompanyNameMatchKeyRequest,
): Promise<MatchKeyResponse> {
  const config = {
    headers: {
      'x-api-key': request.apiKey,
    },
  };
  const algorithm = request.algorithm || 'wide';

  let response: AxiosResponse;

  try {
    const url = `https://api.interzoid.com/getcompanymatchadvanced?company=${request.companyName}&algorithm=${algorithm}`;
    response = await axios.get(url, config);
  } catch (error) {
    throw new Error(`Network or server error: ${error}`);
  }

  switch (response.status) {
    case 200:
      if (response.data && response.data.simKey) {
        return {
          simKey: response.data.simKey,
          code: response.data.code,
          credits: response.data.credits,
        };
      } else {
        throw new Error('Invalid response structure');
      }
    case 400:
      throw new Error(
        'Bad Request: The server could not understand the request.',
      );
    case 402:
      throw new Error('Credits Exhausted: You have run out of credits.');
    case 403:
      throw new Error(
        'Invalid API key: You do not have permission to use this resource.',
      );
    case 405:
      throw new Error(
        'Method Not Allowed: The resource does not support the specified HTTP verb.',
      );
    case 500:
      throw new Error(
        'Internal Server Error: An error occurred on the server.',
      );
    default:
      throw new Error(`Unexpected HTTP status code ${response.status}`);
  }
}
