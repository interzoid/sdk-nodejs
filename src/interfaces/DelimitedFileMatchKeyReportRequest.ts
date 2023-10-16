import { InterzoidRequest } from './InterzoidRequest';
import { Category } from './Category';
import { Source } from './Source';

/**
 * CsvMatchKeyReportRequest represents the request to the CSV or TSV Match Key Report API.
 * @interface DelimitedFileMatchKeyReportRequest
 * @property {Source.CSV | Source.TSV} source - The source type of the data.
 * @property {Category} category - This category type indicates which set of Machine Learning and matching algorithms to make use of based on type of data content.
 * @property {string} csvUrl - The full URL of the location of the CSV file.
 * @property {number} matchColumn - The column number of the CSV file to match against.
 * @property {number} [referenceColumn] - An additional column from the source table to display in the output results, such as a primary key.
 * @property {'json' | 'html' | 'text'} [responseFormat] - The format of the response. If not specified, defaults to 'text'.
 */
export interface DelimitedFileMatchKeyReportRequest extends InterzoidRequest {
  source: Source.CSV | Source.TSV;
  category: Category;
  csvUrl: string;
  matchColumn: number;
  referenceColumn?: number;
  responseFormat?: 'json' | 'html' | 'text';
}
