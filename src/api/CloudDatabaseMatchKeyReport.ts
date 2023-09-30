import { CloudWorkloadRequest } from '../interfaces/CloudWorkloadRequest';
import { InterzoidApi } from './InterzoidApi';
import { CloudWorkloadResponse } from '../interfaces/CloudWorkloadResponse';
import { Category } from '../interfaces/Category';
import { Process } from '../interfaces/Process';
import { Source } from '../interfaces/Source';

export async function getCloudDatabaseMatchKeyReport(
  request: CloudWorkloadRequest,
) {
  const validationResult = isValidRequest(request);
  if (!validationResult.isValid) {
    throw new Error(validationResult.errors.join(' '));
  }

  const params = {
    function: 'match',
    process: request.process ?? Process.MATCH_REPORT,
    table: request.table,
    source: request.source,
    connection: request.connection,
    category: request.category,
    column: request.column,
    reference: request.reference,
    json: request.json,
    html: request.html,
    newtable: request.newTable,
    apikey: request.apiKey,
  };

  const response = await InterzoidApi.doCloudConnectRequest(params);
  return response as CloudWorkloadResponse;
}

function isValidRequest(obj: any): {
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

  // Validate process
  if (
    !obj?.process ||
    !Object.values(Process).includes(obj.process as Process)
  ) {
    isValid = false;
    errors.push(
      `Invalid 'process'. It must be one of the following: ${Object.values(
        Process,
      ).join(', ')}`,
    );
  } else {
    if (obj.process === Process.CREATE_TABLE && !obj.newTable) {
      isValid = false;
      errors.push(
        "Invalid 'newTable'. It is required when process is CREATE_TABLE.",
      );
    }
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

  // Validate connection
  if (!obj?.connection || typeof obj.connection !== 'string') {
    isValid = false;
    errors.push("Invalid 'connection'. Must be a string.");
  }

  // Validate source
  if (!obj?.source || !Object.values(Source).includes(obj.source as Source)) {
    isValid = false;
    errors.push(
      `Invalid 'source'. It must be one of the following: ${Object.values(
        Source,
      ).join(', ')}`,
    );
  }

  // Validate table
  if (!obj?.table || typeof obj.table !== 'string') {
    isValid = false;
    errors.push("Invalid 'table'. Must be a string.");
  }

  // Validate column
  if (!obj?.column || typeof obj.column !== 'string') {
    isValid = false;
    errors.push("Invalid 'column'. Must be a string.");
  }

  // Validate reference
  if (obj?.reference && typeof obj.reference !== 'string') {
    isValid = false;
    errors.push("Invalid 'reference'. Must be a string.");
  }

  // Validate newTable
  if (obj?.newTable && typeof obj.newTable !== 'string') {
    isValid = false;
    errors.push("Invalid 'newTable'. Must be a string.");
  }

  // Validate process is CREATE_TABLE when newTable is provided
  if (obj?.newTable && obj.process !== Process.CREATE_TABLE) {
    isValid = false;
    errors.push(
      "Invalid 'newTable'. It is only valid when process is CREATE_TABLE.",
    );
  }

  // Validate json
  if (obj?.json && typeof obj.json !== 'boolean') {
    isValid = false;
    errors.push("Invalid 'json'. Must be a boolean.");
  }

  // Validate html
  if (obj?.html && typeof obj.html !== 'boolean') {
    isValid = false;
    errors.push("Invalid 'html'. Must be a boolean.");
  }

  return { isValid, errors };
}
