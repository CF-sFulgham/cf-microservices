import { Injectable } from '@nestjs/common';
import { IRbsStatus } from '../interfaces/rbsStatus';
import { IContent } from '../../../shared/modules/content/interfaces/content';
const faker = require('faker');

@Injectable()
export class RbsStatusMockService implements IRbsStatus, IContent {
  private statuses;
  private processStatuses;
  contentName;

  constructor() {
    this.contentName = 'RBS Status Mock';
    this.statuses = [];
    this.processStatuses = [
      { code: 'A', description: 'Adjustment'},
      { code: 'L', description: 'Litigation'},
      { code: 'P', description: 'Paid'},
      { code: 'I', description: 'Initial'},
      { code: 'N', description: 'Not Paid'},
      { code: 'R', description: 'Refund'},
      { code: 'W', description: 'Write Off'},
      { code: '1', description: 'Pending'},
      { code: '3', description: 'Cancelled'},
      { code: '4', description: 'Denied'}
    ];
  }

  getAllStatuses(): Promise<any> {
    const statuses = [];
    const promise = new Promise(res => {
      for (let index = 0; index < 36; index++) {
        const processStatus = faker.random.arrayElement(this.processStatuses);
        const newDate = new Date(faker.date.past());
  
        statuses.push({
          processStatus: processStatus.code,
          description: processStatus.description,
          classType: faker.random.alphaNumeric(1),
          activeStatus: 'A',
          updateId: `${faker.random.alphaNumeric(1)}${faker.finance.mask(4)}`,
          updateDate: `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`,
        });
      }
      res(statuses);
    })
    
    return promise;
  }
}