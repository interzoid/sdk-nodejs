import { CsvMatchKeyReportRequest } from '../interfaces/CsvMatchKeyReportRequest';
import { InterzoidApi } from './InterzoidApi';
import { CsvMatchKeyReportResponse } from '../interfaces/CsvMatchKeyReportResponse';
import { Source } from '../interfaces/Source';
import { Process } from '../interfaces/Process';

export async function getCsvMatchKeyReport(request: CsvMatchKeyReportRequest) {
  if (!isValidCsvMatchKeyReportRequest(request)) {
    throw new Error('Invalid request.');
  }
  const params: object = {
    function: 'match',
    process: Process.MATCH_REPORT,
    table: Source.CSV,
    source: Source.CSV,
    json: true,
    connection: request.csvUrl,
    category: request.category,
    column: request.matchColumn,
    reference: request.referenceColumn,
    apikey: request.apiKey,
  };

  const response = await InterzoidApi.doCloudConnectRequest(params);

  return response as CsvMatchKeyReportResponse;
}

function isValidCsvMatchKeyReportRequest(
  obj: any,
): obj is CsvMatchKeyReportRequest {
  //todo
  return obj && typeof obj.apiKey === 'string';
}
