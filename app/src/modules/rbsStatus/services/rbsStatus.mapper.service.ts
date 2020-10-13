import { Injectable } from '@nestjs/common';
import { Statuses } from '../models/statuses';
import { RbsStatus } from '../models/rbsStatus';

const faker = require('faker');

@Injectable()
export class RbsStatusMapperService {
  mapStatuses(statuses): Statuses {
    const statusesArr = [];

    statuses.forEach(status => {
      const rbsStatus = new RbsStatus();

      rbsStatus.processStatus = status.processStatus;
      rbsStatus.description = status.description;
      rbsStatus.classType = status.classType;
      rbsStatus.activeStatus = status.activeStatus;
      rbsStatus.updateId = status.updateId;
      rbsStatus.updateDate = status.updateDate;

      statusesArr.push(rbsStatus);
    });

    const set = new Statuses();
    set.statuses = statusesArr;

    return set;
  }
}