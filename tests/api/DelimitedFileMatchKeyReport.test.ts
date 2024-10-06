import axios, { AxiosHeaders } from 'axios';

import {
  DelimitedFileMatchKeyReportRequest,
  getDelimitedFileMatchKeyReport,
  Process,
  Category,
  Source,
} from '../../src';

jest.mock('axios');

describe('getCsvMatchKeyReport', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('returns a response when the request is valid', async () => {
    const request: DelimitedFileMatchKeyReportRequest = {
      category: Category.COMPANY,
      source: Source.CSV,
      process: Process.MATCH_REPORT,
      algorithm: 'ai-medium',
      fileUrl: 'https://dl.interzoid.com/csv/companies.csv',
      matchColumn: 1,
      apiKey: 'test-api-key',
      responseFormat: 'json',
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
    const result = await getDelimitedFileMatchKeyReport(request);
    expect(result.Status).toEqual('success');
  });

  it('returns a response when the request is valid', async () => {
    const request: DelimitedFileMatchKeyReportRequest = {
      category: Category.COMPANY,
      source: Source.PARQUET,
      process: Process.MATCH_REPORT,
      fileUrl: 'https://dl.interzoid.com/parquet/companies.parquet',
      matchColumn: 1,
      apiKey: 'test-api-key',
      responseFormat: 'json',
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
    const result = await getDelimitedFileMatchKeyReport(request);
    expect(result.Status).toEqual('success');
  });

  it('throws an error when the request is invalid', async () => {
    const request: DelimitedFileMatchKeyReportRequest = {
      category: Category.COMPANY,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      source: 'AWS Aurora MySQL',
      fileUrl: 'https://dl.interzoid.com/csv/companies.csv',
      matchColumn: 1,
      apiKey: 'test-api-key',
      responseFormat: 'json',
    };
    await expect(getDelimitedFileMatchKeyReport(request)).rejects.toThrow(
      `Invalid 'source'. It must be 'CSV', 'TSV', 'Excel, or 'Parquet'.`,
    );
  });

  it('throws an error when the request is invalid', async () => {
    const request: DelimitedFileMatchKeyReportRequest = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      category: 'Person',
      source: Source.CSV,
      fileUrl: 'https://dl.interzoid.com/csv/companies.csv',
      matchColumn: 1,
      apiKey: 'test-api-key',
      responseFormat: 'json',
    };
    await expect(getDelimitedFileMatchKeyReport(request)).rejects.toThrow(
      `Invalid 'category'. It must be one of the following: address, company, individual`,
    );
  });
});
