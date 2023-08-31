import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

export class InterzoidApi {
  private static readonly baseUrl = 'https://api.interzoid.com/';

  public static async doGetRequest(
    resource: string,
    apiKey: string,
    params?: object,
  ) {
    const config: AxiosRequestConfig = {
      headers: {
        'x-api-key': apiKey,
      },
      params: params,
      paramsSerializer: (params: object) => {
        return qs.stringify(params);
      },
    };

    const requestUri = this.baseUrl + resource;

    let response: AxiosResponse;

    try {
      response = await axios.get(requestUri, config);
    } catch (error) {
      throw new Error(`Network or server error: ${error}`);
    }

    switch (response.status) {
      case 200:
        if (response.data) {
          return response.data;
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
}
