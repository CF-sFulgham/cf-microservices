import { AppStatusCode } from '../../enums/appStatus';
import { StatusError } from './status';

const UNAUTHORIZED_MSG = 'Authorized Personel Only';

export class UnauthorizedError extends StatusError {
  constructor() {
    super(401, UNAUTHORIZED_MSG);
    this.name = this.constructor.name;
    this.appStatusCode = AppStatusCode.Unauthorized;
    Error.captureStackTrace(this, this.constructor);
  }
}
