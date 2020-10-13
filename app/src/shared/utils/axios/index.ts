import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as express from 'express';
const httpContext = require('express-http-context');
import { IncomingHttpHeaders } from 'http';
import { Agent } from 'https';

export const onRequest = (config: AxiosRequestConfig) => {
  const passthruHeaders = httpContext.get('passthruHeaders');
  config.httpsAgent = new Agent({
    rejectUnauthorized: false,
  });
  config.headers = {
    ...config.headers,
    ...passthruHeaders,
  };
  return config;
};

export const onResponseSuccess = (response: AxiosResponse) => {
  return response;
};

export default class AxiosAdapter {

  public static _defaultHeaders: IncomingHttpHeaders = {
    preferredlang: 'en_US',
  };

  public static init(config?: {[t: string]: any, passthruHeaders?: string[]}) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (config && config.passthruHeaders) {
        const passthruHeaders = {...AxiosAdapter._defaultHeaders};
        config.passthruHeaders.forEach((headerName) => {
          const key = headerName.toLowerCase();
          if (typeof(req.headers[key]) !== 'undefined') {
            if (passthruHeaders[key]) {
              delete(passthruHeaders[key]);
            }
            passthruHeaders[key] = req.headers[key];
          }
        });
        httpContext.set('passthruHeaders', passthruHeaders);
      }
      next();
    }
  }

  private _instance: AxiosInstance;

  constructor(config: {[t: string]: any}) {
    this._instance = axios.create(config);
    this._instance.interceptors.request.use(onRequest);
  }

  public request(config: AxiosRequestConfig) {
    return this._instance.request(config);
  }

  public get(url: string, config?: AxiosRequestConfig ) {
    return this._instance.get(url, config);
  }

  public put(url: string, data?: any, config?: AxiosRequestConfig ) {
    return this._instance.put(url, data, config);
  }

  public post(url: string, data?: any, config?: AxiosRequestConfig ) {
    return this._instance.post(url, data, config);
  }

  public patch(url: string, data?: any, config?: AxiosRequestConfig ) {
    return this._instance.patch(url, data, config);
  }

  public delete(url: string, config?: AxiosRequestConfig ) {
    return this._instance.delete(url, config);
  }
}
