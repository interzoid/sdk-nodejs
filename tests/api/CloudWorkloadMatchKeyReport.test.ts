import axios, { AxiosHeaders } from 'axios';
import {
  Category,
  CloudWorkloadRequest,
  getCloudDatabaseMatchKeyReport,
  Process,
  Source,
} from '../../src';

jest.mock('axios');

describe('CloudWorkloadMatchKeyReport', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns a response when the request is valid', async () => {
    const request: CloudWorkloadRequest = {
      process: Process.MATCH_REPORT,
      category: Category.COMPANY,
      source: Source.MYSQL,
      connection: 'mysql://user:pass@host:port/db',
      table: 'companies',
      column: 'companyname',
      reference: 'id',
      json: true,
      html: false,
      apiKey: 'test-api-key',
    };
    const mockResponse = {
      data: { Status: 'success', Message: '', MatchClusters: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);
    const result = await getCloudDatabaseMatchKeyReport(request);
    expect(result.Status).toEqual('success');
  });

  it('throws an error when the request is invalid', () => {
    const request: any = {
      apiKey: 'test-api-key',
      process: Process.CREATE_TABLE,
      category: Category.COMPANY,
      source: Source.MYSQL,
      connection: 'mysql://user:pass@host:port/db',
      table: 'companies',
      column: 'companyname',
      // missing newTable. required when process is CREATE_TABLE
    };
    expect(() => getCloudDatabaseMatchKeyReport(request)).rejects.toThrow(
      "Invalid 'newTable'. It is required when process is CREATE_TABLE.",
    );
  });

  it('throws an error when the request is invalid', () => {
    const request: any = {
      apiKey: 'test-api-key',
      process: 'Match Report', // invalid process
      category: Category.COMPANY,
      source: Source.MYSQL,
      connection: 'mysql://user:pass@host:port/db',
      table: 'companies',
      column: 'companyname',
    };
    expect(() => getCloudDatabaseMatchKeyReport(request)).rejects.toThrow(
      `Invalid 'process'. It must be one of the following: ${Object.values(
        Process,
      ).join(', ')}`,
    );
  });

  it('throws an error when the request is invalid', () => {
    const request: any = {
      apiKey: 'test-api-key',
      process: Process.MATCH_REPORT,
      category: 'Person', // invalid category
      source: Source.MYSQL,
      connection: 'mysql://user:pass@host:port/db',
      table: 'companies',
      column: 'companyname',
    };
    expect(() => getCloudDatabaseMatchKeyReport(request)).rejects.toThrow(
      `Invalid 'category'. It must be one of the following: ${Object.values(
        Category,
      ).join(', ')}`,
    );
  });
});
