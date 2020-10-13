import { AppStatusCode } from '../../enums/appStatus';
import { StatusError } from './status';

const INVALID_SESSION_MSG = 'Invalid or expired session';

export class InvalidSessionError extends StatusError {
  constructor() {
    super(400, INVALID_SESSION_MSG);
    this.name = this.constructor.name;
    this.appStatusCode = AppStatusCode.InvalidSession;
    Error.captureStackTrace(this, this.constructor);
  }
}
