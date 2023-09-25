import { CsvMatchKeyReportRequest } from '../interfaces/CsvMatchKeyReportRequest';
import { InterzoidApi } from './InterzoidApi';
import { CsvMatchKeyReportResponse } from '../interfaces/CsvMatchKeyReportResponse';
import { Source } from '../interfaces/Source';
import { Process } from '../interfaces/Process';
import { Category } from '../interfaces/Category';

/**
 * getCsvMatchKeyReport returns a report of all found clusters of similar data.
 * @param {CsvMatchKeyReportRequest} request
 * @returns {Promise<CsvMatchKeyReportResponse>} response
 */
export async function getCsvMatchKeyReport(
  request: CsvMatchKeyReportRequest,
): Promise<CsvMatchKeyReportResponse> {
  const validationResult = isValidCsvMatchKeyReportRequest(request);
  if (!validationResult.isValid) {
    throw new Error(validationResult.errors.join(' '));
  }

  const params = {
    function: 'match',
    process: Process.MATCH_REPORT,
    table: request.source,
    source: request.source,
    connection: request.csvUrl,
    category: request.category,
    column: request.matchColumn,
    reference: request.referenceColumn,
    apikey: request.apiKey,
    json: request.responseFormat === 'json',
    html: request.responseFormat === 'html',
  };

  const response = await InterzoidApi.doCloudConnectRequest(params);

  return response as CsvMatchKeyReportResponse;
}

function isValidCsvMatchKeyReportRequest(obj: any): {
  isValid: boolean;
  errors: string[];
} {
  let isValid = true;
  const errors: string[] = [];

  // Validate apiKey
  if (!obj?.apiKey || typeof obj.apiKey !== 'string') {
    isValid = false;
    errors.push("Invalid 'apiKey'.");
  }

  // Validate csvUrl
  if (!obj?.csvUrl || typeof obj.csvUrl !== 'string') {
    isValid = false;
    errors.push("Invalid 'csvUrl'.");
  }

  // Validate source
  if (
    !obj?.source ||
    (obj.source !== Source.CSV && obj.source !== Source.TSV)
  ) {
    isValid = false;
    errors.push("Invalid 'source'. It must be either 'CSV' or 'TSV'.");
  }

  // Validate category
  if (
    !obj?.category ||
    !Object.values(Category).includes(obj.category as Category)
  ) {
    isValid = false;
    errors.push(
      `Invalid 'category'. It must be one of the following: ${Object.values(
        Category,
      ).join(', ')}`,
    );
  }

  // Validate matchColumn
  if (typeof obj?.matchColumn !== 'number') {
    isValid = false;
    errors.push(
      "Invalid 'matchColumn'. It must be the number of a column in your CSV or TSV file.",
    );
  }

  // Validate optional properties
  if (
    obj?.referenceColumn !== undefined &&
    typeof obj.referenceColumn !== 'number'
  ) {
    isValid = false;
    errors.push("Invalid 'referenceColumn'. If provided, it must be a number.");
  }

  if (
    obj?.responseFormat &&
    !['json', 'html', 'text'].includes(obj.responseFormat)
  ) {
    isValid = false;
    errors.push(
      "Invalid 'responseFormat'. If provided, it must be either 'json', 'html', or 'text'.",
    );
  }

  return { isValid, errors };
}
