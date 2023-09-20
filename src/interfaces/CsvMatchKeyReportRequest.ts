import { InterzoidRequest } from './InterzoidRequest';
import { Category } from './Category';

/**
 * CsvMatchKeyReportRequest represents the request to the CSV Match Key Report API.
 * @interface CsvMatchKeyReportRequest
 * @extends {InterzoidRequest}
 * @property {Category} category - This category type indicates which set of Machine Learning and matching algorithms to make use of based on type of data content.
 * @property {string} csvUrl - The full URL of the location of the CSV file.
 * @property {number} matchColumn - The column number of the CSV file to match against.
 * @property {number} [referenceColumn] - An additional column from the source table to display in the output results, such as a primary key.
 */
export interface CsvMatchKeyReportRequest extends InterzoidRequest {
  category: Category;
  csvUrl: string;
  matchColumn: number;
  referenceColumn?: number;
}
