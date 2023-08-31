import { InterzoidRequest } from './InterzoidRequest';

export interface FullNameMatchKeyRequest extends InterzoidRequest {
  fullName: string;
}
