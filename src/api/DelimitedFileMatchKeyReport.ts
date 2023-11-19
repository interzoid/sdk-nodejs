import { DelimitedFileMatchKeyReportRequest } from '../interfaces/DelimitedFileMatchKeyReportRequest';
import { InterzoidApi } from './InterzoidApi';
import { DelimitedFileMatchKeyReportResponse } from '../interfaces/DelimitedFileMatchKeyReportResponse';
import { Source } from '../interfaces/Source';
import { Process } from '../interfaces/Process';
import { Category } from '../interfaces/Category';

/**
 * getDelimitedFileMatchKeyReport reads a CSV or TSV file from a URL and returns a report of matching keys.
 * @param {DelimitedFileMatchKeyReportRequest} request
 * @returns {Promise<DelimitedFileMatchKeyReportResponse>} response
 */
export async function getDelimitedFileMatchKeyReport(
  request: DelimitedFileMatchKeyReportRequest,
): Promise<DelimitedFileMatchKeyReportResponse> {
  const validationResult = isValidCsvMatchKeyReportRequest(request);
  if (!validationResult.isValid) {
    throw new Error(validationResult.errors.join(' '));
  }

  const params = {
    function: 'match',
    process: request.process || Process.MATCH_REPORT,
    table: request.source,
    source: request.source,
    connection: request.csvUrl,
    category: request.category,
    column: request.matchColumn,
    reference: request.referenceColumn,
    json: request.responseFormat === 'json',
    html: request.responseFormat === 'html',
    apikey: request.apiKey,
  };

  const response = await InterzoidApi.doCloudConnectRequest(params);
  return response as DelimitedFileMatchKeyReportResponse;
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
    (obj.source !== Source.CSV &&
      obj.source !== Source.TSV &&
      obj.source !== Source.EXCEL)
  ) {
    isValid = false;
    errors.push("Invalid 'source'. It must be 'CSV', 'TSV' or 'Excel.");
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
