import { AppStatusCode } from '../../enums/appStatus';
import { StatusError } from './status';

const SYSTEM_MSG = 'An internal system error has occured';

export class SystemError extends StatusError {
  constructor() {
    super(500, SYSTEM_MSG);
    this.name = this.constructor.name;
    this.appStatusCode = AppStatusCode.SystemError;
    Error.captureStackTrace(this, this.constructor);
  }
}
