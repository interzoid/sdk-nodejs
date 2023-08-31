import { InterzoidRequest } from './InterzoidRequest';

export interface FullNameParsedMatchKeyRequest extends InterzoidRequest {
  firstName: string;
  lastName: string;
}
