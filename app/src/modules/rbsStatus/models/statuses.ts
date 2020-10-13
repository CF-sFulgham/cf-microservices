import { ApiProperty } from '@nestjs/swagger';
import { RbsStatus } from './rbsStatus';

export class Statuses {
  @ApiProperty({
    type: Array,
    required: true,
  })
  statuses: RbsStatus[];
}