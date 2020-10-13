import { AppStatusCode } from '../../enums/appStatus';
import { StatusError } from './status';

const NO_SUCH_RESOURCE = 'No such resource ({type}) for key ({key})';

export class NoSuchResourceError extends StatusError {
  constructor(type: string, key: string) {
    super(404, NO_SUCH_RESOURCE.replace(/{type}/g, type).replace(/{key}/g, key));
    this.name = this.constructor.name;
    this.appStatusCode = AppStatusCode.NoSuchResource;
    Error.captureStackTrace(this, this.constructor);
  }
}
