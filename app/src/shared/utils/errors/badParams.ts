
import { AppStatusCode } from '../../enums/appStatus';
import { StatusError } from './status';

const BAD_PARAMS_MSG = 'Invalid parameters';

export class BadParamsError extends StatusError {
  constructor() {
    super(400, BAD_PARAMS_MSG);
    this.name = this.constructor.name;
    this.appStatusCode = AppStatusCode.InvalidParameters;
    Error.captureStackTrace(this, this.constructor);
  }
}
