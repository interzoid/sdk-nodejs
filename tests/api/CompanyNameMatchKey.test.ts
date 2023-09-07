import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import {
  CompanyNameMatchKeyRequest,
  getCompanyNameMatchKey,
  MatchKeyResponse,
} from '../../src';

jest.mock('axios');

describe('getCompanyNameMatchKey', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns a simKey when the request is valid', async () => {
    // Arrange
    const request: CompanyNameMatchKeyRequest = {
      company: 'Apple, Inc',
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
    const result = await getCompanyNameMatchKey(request);

    // Assert
    expect(result.simKey).toEqual('12345');
  });

  it('throws an error when the request is invalid', async () => {
    const req1: any = {
      apiKey: '12345',
      // missing company
    };
    const req2: any = {
      company: 'Apple, Inc',
      // missing apiKey
    };

    await expect(getCompanyNameMatchKey(req1)).rejects.toThrow(
      'Invalid request. "apiKey" and "company" are required.',
    );
    await expect(getCompanyNameMatchKey(req2)).rejects.toThrow(
      'Invalid request. "apiKey" and "company" are required.',
    );
  });

  it('throws an error when the status is 403', async () => {
    // Arrange
    const request: CompanyNameMatchKeyRequest = {
      company: 'Apple, Inc',
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
    await expect(getCompanyNameMatchKey(request)).rejects.toThrow(
      'Invalid API key: You do not have permission to use this resource.',
    );
  });
});
