import { InterzoidRequest } from './InterzoidRequest';
import { Source } from './Source';
import { Process } from './Process';
import { Category } from './Category';

/**
 * CloudDatasetMatchRequest represents the request to the Cloud Data Matching API.
 * @interface CloudWorkloadRequest
 * @extends {InterzoidRequest}
 * @property {Process} process - Process to perform
 * @property {Category} category - This category type indicates which set of Machine Learning and matching algorithms to make use of based on type of data content.
 * @property {Source} source - Source of data, such as 'MySQL', 'Snowflake', 'Postgres', etc.
 * @property {string} connection - Connection string to access database, or in the case of a CSV or TSV file, use the full URL of the location of the file.
 * @property {string} table - Table name to access the source data. Use "CSV" or "TSV" for delimited text files.
 * @property {string} column - Column name within the table to access the source data. This is a number for CSV or TSV files, starting with number 1 from the left side of the file.
 * @property {string} [reference] - An additional column from the source table to display in the output results, such as a primary key.
 * @property {string} [newTable] - The name of the new table if the output results are written to a new table. Required if process is CREATE_TABLE.
 * @property {boolean} [json] - If true, the output will be in JSON format.
 * @property {boolean} [html] - Set to 'true' to pad line breaks into the output results for better readability ina browser when run from the address bar.
 */
export interface CloudWorkloadRequest extends InterzoidRequest {
  process: Process;
  category: Category;
  source: Source;
  connection: string;
  table: string;
  column: string;
  reference?: string;
  newTable?: string; //required if process is CREATE_TABLE
  json?: boolean;
  html?: boolean;
}
