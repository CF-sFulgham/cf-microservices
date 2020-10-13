import { ApiProperty } from '@nestjs/swagger';

export class RbsStatus {
  @ApiProperty({
    type: String,
    required: true,
  })
  activeStatus: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  processStatus: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  classType: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  updateId: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  updateDate: string;
}
