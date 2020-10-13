import { AppStatusCode } from '../../enums/appStatus';

export class StatusError extends Error {
  constructor(code, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = code;
    Error.captureStackTrace(this, this.constructor);
  }
  component: string;
  statusCode: number;
  appStatusCode: AppStatusCode;
}
