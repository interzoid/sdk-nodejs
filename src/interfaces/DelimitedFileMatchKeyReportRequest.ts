import { InterzoidRequest } from './InterzoidRequest';
import { Category } from './Category';
import { Source } from './Source';
import { Process } from './Process';

/**
 * CsvMatchKeyReportRequest represents the request to the CSV or TSV Match Key Report API.
 * @interface DelimitedFileMatchKeyReportRequest
 * @property {Source.CSV | Source.TSV} source - The source type of the data.
 * @property {Category} category - This category type indicates which set of Machine Learning and matching algorithms to make use of based on type of data content.
 * @property {string} fileUrl - The full URL of the location of the file.
 * @property {number} matchColumn - The column number of the file to match against.
 * @property {number} referenceColumn - An additional column from the source table to display in the output results, such as a primary key.
 * @property {'json' | 'html' | 'text'} responseFormat - The format of the response. If not specified, defaults to 'text'.
 * @property {'csv' | 'tsv' | 'psv' | 'ssv'} target - The delimiter type of the output file. Only valid with Process.KEYS_ONLY. If not specified, defaults to 'csv'.
 * @property {boolean} keysOutputAll - If true, all columns in the file will be output in the response with the similarity key appended. Only valid with Process.KEYS_ONLY.  Defaults to false.
 */
export interface DelimitedFileMatchKeyReportRequest extends InterzoidRequest {
  source: Source.CSV | Source.TSV | Source.EXCEL | Source.PARQUET;
  process: Process.MATCH_REPORT | Process.KEYS_ONLY;
  category: Category;
  /** @deprecated - Use fileUrl instead. */
  csvUrl?: string;
  fileUrl?: string;
  matchColumn: number;
  algorithm?: string;
  referenceColumn?: number;
  responseFormat?: 'json' | 'html' | 'text';
  target?: 'csv' | 'tsv' | 'psv' | 'ssv';
  keysOutputAll?: boolean;
}
