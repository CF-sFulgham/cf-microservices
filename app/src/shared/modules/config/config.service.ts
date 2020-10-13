import * as config from 'config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get(key: string): any {
    let v: any;
    if (key === '.') {
      const p = config.util.getConfigSources()[0].parsed;
      v = config.util.cloneDeep(p);
    } else {
      v = config.has(key) ? config.get(key) : undefined;
    }
    return v;
  }
}

// tslint:disable-next-line
export const Config = new ConfigService();