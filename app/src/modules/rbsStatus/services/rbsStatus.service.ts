import { Injectable } from '@nestjs/common';
import { IRbsStatus } from '../interfaces/rbsStatus';
import { IContent } from '../../../shared/modules/content/interfaces/content';

@Injectable()
export class RbsStatusService implements IRbsStatus, IContent {
  contentName;

  constructor() {
    this.contentName = 'RBS Status';
  }

  public async getAllStatuses(): Promise<any>{
    // z/OS Connect
  }
}