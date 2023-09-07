import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { MatchScoreRequest, MatchScoreResponse } from '../../src';
import { getFullNameMatchScore } from '../../src/api/FullNameMatchScore';

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
    const result = await getFullNameMatchScore(request);

    // Assert
    expect(result.score).toEqual('89');
  });

  it('throws an error when the request is invalid', () => {
    const req: any = {
      value1: 'John Smith',
      // missing value2
      apiKey: '12345',
    };
    expect(() => getFullNameMatchScore(req)).rejects.toThrow(
      'Invalid request. "apiKey", "value1" and "value2" are required.',
    );
  });
});
