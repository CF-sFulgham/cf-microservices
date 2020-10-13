import { LoggerService, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger, transports, createLogger, format } from 'winston';
import { Config } from '../config/config.service';

export const APP_LOGGER = 'AppLogger';

const PADDED_LEVELS = {
  info:    'info ',
  warn :   'warn ',
  error:   'error',
  debug :  'debug',
  verbose: 'debug',
};

const DEFAULT_CTX = 'app';
const LEVEL = Config.get('logging.level') || 'info';
const FORMAT = (!Config.get('logging.prod')) ?
  format.combine(
    format.timestamp(),
    format.printf(le => {
      return `${le.timestamp} [${PADDED_LEVELS[le.level]}] : ${le.message}`;
    }),
    format.colorize(),
  ) :
  format.combine(
    format.timestamp(),
    format.json(),
);

@Injectable()
export class AppLogger implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
    logger.add(new transports.Console({ format: FORMAT }));
    logger.level = LEVEL;
    logger.info(`logging level set to : ${LEVEL}`);
  }

  log(message: any, ctx?: string): void {
    const lg = ctx || DEFAULT_CTX;
    const msg = this.asString(message);
    const finalMsg = `[${lg}] ${msg} `;
    this.logger.info(finalMsg);
  }

  error(message: any, trace?: string, ctx?: string): void {
    const lg = ctx || DEFAULT_CTX;
    let msg = this.asString(message);
    msg = (trace ? `${msg} [${trace}]` : msg);
    const finalMsg = `[${lg}] ${msg} `;
    this.logger.error(finalMsg);
  }

  warn(message: any, ctx?: string): void {
    const msg = this.asString(message);
    const lg = ctx || DEFAULT_CTX;
    const finalMsg = `[${lg}] ${msg} `;
    this.logger.warn(finalMsg);
  }

  debug(message: any, ctx?: string): void {
    const msg = this.asString(message);
    const lg = ctx || DEFAULT_CTX;
    const finalMsg = `[${lg}] ${msg} `;
    this.logger.debug(finalMsg);
  }

  verbose(message: any, ctx?: string): void {
    const msg = this.asString(message);
    const lg = ctx || DEFAULT_CTX;
    const finalMsg = `[${lg}] ${msg} `;
    this.logger.verbose(finalMsg);
  }

  static create(): AppLogger {
    return new AppLogger(createLogger({}));
  }

  private asString(o: any): string {
    let msg = o;
    if (o.isAxiosError && o.toJSON) {
      msg = JSON.stringify(o.toJSON(), null, 2);
    } else {
      if (o?.stack && o?.message) {
        if (o.response?.message) {
          msg = `${o?.response?.message} - ${o.stack}`;
        } else {
          msg = `${o.stack}`;
        }
      }
    }
    return msg;
  }
}
