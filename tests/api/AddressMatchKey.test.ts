import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import {
  AddressMatchKeyRequest,
  getAddressMatchKey,
  MatchKeyResponse,
} from '../../src';

jest.mock('axios');

describe('getCompanyNameMatchKey', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns a simKey when the request is valid', async () => {
    // Arrange
    const request: AddressMatchKeyRequest = {
      address: '1234 Main Street, Anytown USA',
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
    const result = await getAddressMatchKey(request);

    // Assert
    expect(result.simKey).toEqual('12345');
  });

  it('throws an error when the request is invalid', async () => {
    const req1: any = {
      address: '1234 Main Street, Anytown USA',
      // missing apiKey
    };
    const req2: any = {
      apiKey: '12345',
      // missing address
    };

    await expect(getAddressMatchKey(req1)).rejects.toThrow(
      'Invalid request. "apiKey" and "address" are required.',
    );

    await expect(getAddressMatchKey(req2)).rejects.toThrow(
      'Invalid request. "apiKey" and "address" are required.',
    );
  });

  it('throws an error when the status is 403', async () => {
    // Arrange
    const request: AddressMatchKeyRequest = {
      address: '1234 Main Street, Anytown USA',
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
    await expect(getAddressMatchKey(request)).rejects.toThrow(
      'Invalid API key: You do not have permission to use this resource.',
    );
  });
});
