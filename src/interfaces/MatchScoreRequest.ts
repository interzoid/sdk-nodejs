import { InterzoidRequest } from './InterzoidRequest';

export interface MatchScoreRequest extends InterzoidRequest {
  value1: string;
  value2: string;
}
