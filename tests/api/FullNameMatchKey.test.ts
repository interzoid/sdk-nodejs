import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import {
  FullNameMatchKeyRequest,
  getFullNameMatchKey,
  MatchKeyResponse,
} from '../../src';

jest.mock('axios');

describe('getFullNameMatchKey', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns a simKey when the request is valid', async () => {
    // Arrange
    const request: FullNameMatchKeyRequest = {
      fullName: 'John Doe',
      apiKey: 'test-api-key',
    };
    const mockResponse: AxiosResponse<MatchKeyResponse> = {
      data: { simKey: '12345', code: 'Success', credits: '9999' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    // Act
    const result = await getFullNameMatchKey(request);

    // Assert
    expect(result.simKey).toEqual('12345');
  });

  it('throws an error when the request is invalid', () => {
    const req1: any = {
      fullName: 'John Doe',
      // missing apiKey
    };
    const req2: any = {
      apiKey: '12345',
      // missing fullName
    };

    expect(() => getFullNameMatchKey(req1)).rejects.toThrow(
      'Invalid request. "apiKey" and "fullName" are required.',
    );
    expect(() => getFullNameMatchKey(req2)).rejects.toThrow(
      'Invalid request. "apiKey" and "fullName" are required.',
    );
  });

  it('throws an error when the status is 403', async () => {
    // Arrange
    const request: FullNameMatchKeyRequest = {
      fullName: 'John Doe',
      apiKey: 'test-api-key',
    };
    const mockResponse: AxiosResponse = {
      data: {},
      status: 403,
      statusText: 'Bad Request',
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    // Act & Assert
    await expect(getFullNameMatchKey(request)).rejects.toThrow(
      'Invalid API key: You do not have permission to use this resource.',
    );
  });
});
