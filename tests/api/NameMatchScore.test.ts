import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import {
  MatchScoreRequest,
  MatchScoreResponse,
} from '../../src'
import { getNameMatchScore } from '../../src/api/NameMatchScore'

jest.mock('axios');

describe('getNameMatchScore', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns a score when the request is valid', async () => {
    const request: MatchScoreRequest = {
      value1: 'John Smith',
      value2: 'John Smyth',
      apiKey: 'test-api-key',
    };
    const mockResponse: AxiosResponse<MatchScoreResponse> = {
      data: { score: '89', code: 'Success', credits: '9999' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    // Act
    const result = await getNameMatchScore(request);

    // Assert
    expect(result.score).toEqual('89');
  });
});
