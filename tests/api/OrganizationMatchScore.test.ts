import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import {
  MatchScoreRequest,
  MatchScoreResponse,
} from '../../src'
import { getOrganizationMatchScore } from '../../src/api/OrganizationMatchScore'

jest.mock('axios');

describe('getOrganizationMatchScore', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns a score when the request is valid', async () => {
    const request: MatchScoreRequest = {
      value1: 'Apple Inc.',
      value2: 'Apple',
      apiKey: 'test-api-key',
    };
    const mockResponse: AxiosResponse<MatchScoreResponse> = {
      data: { score: '91', code: 'Success', credits: '9999' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    // Act
    const result = await getOrganizationMatchScore(request);

    // Assert
    expect(result.score).toEqual('91');
  });
});
