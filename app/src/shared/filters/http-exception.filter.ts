import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { uuid } from 'uuidv4';
import { AppStatusCode } from '../enums/appStatus';
import * as config from 'config';

const isProd = config.get('isProd') || false;
const DEFAULT_MSG = 'An error occurred during the request.';
const DEFAULT_DETAIL = 'No more details are available.';
const DEFAULT_CODE = 500;
const INFO = 'http://cf-press.com';
const logger = new Logger('errors');

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(e, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const traceId = uuid();

    let statusCode = DEFAULT_CODE;
    let payload;
    if (e.response && e.response.message) { // http response
      const rmsg = e.response.message;
      let msg: string = DEFAULT_MSG;
      let detail = DEFAULT_DETAIL;
      if (typeof rmsg === 'string' || rmsg instanceof String) {
        msg = rmsg.toString();
      } else if (Array.isArray(rmsg)) { // class-validator
        msg = 'One or more fields are not valid';
        detail = (isProd ? DEFAULT_DETAIL : JSON.stringify(rmsg));
      }
      statusCode = e.response.statusCode || e.response.status || DEFAULT_CODE;
      payload = {
        statusCode,
        appStatusCode: AppStatusCode.Unspecified,
        message: msg,
        detail,
        traceId,
        info: INFO,
      };
    } else if (e.statusCode) { // status error
      statusCode = e.statusCode || e.status || DEFAULT_CODE;
      payload = {
        statusCode,
        appStatusCode: e.appStatusCode || AppStatusCode.Unspecified,
        message: e.message || DEFAULT_MSG,
        detail: DEFAULT_DETAIL,
        traceId,
        info: INFO,
      };
    } else { // anything else
      payload = {
        statusCode: DEFAULT_CODE,
        appStatusCode: AppStatusCode.SystemError,
        message: DEFAULT_MSG,
        detail: (isProd ? DEFAULT_DETAIL : e.message || DEFAULT_DETAIL),
        traceId,
        info: INFO,
      };
    }

    // log level according to status code
    switch (statusCode) {
      case 500:
        logger.error(e, traceId);
        break;
      case 400:
        logger.warn(e);
        break;
      default:
        logger.log(payload.message);
    }

    if (e.headers) {
      e.headers.forEach(h => {
        response.header(h.name, h.value);
      });
    }
    
    const body = Object.assign(payload, e.extra);
    response.status(statusCode);
    response.json(body);

    return e;
  }
}
