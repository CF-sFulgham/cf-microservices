import { ApiProperty } from '@nestjs/swagger';

export class Content {
  @ApiProperty({
    type: Object,
    required: false,
  })
  dataObject: object;

  @ApiProperty({
    type: Array,
    required: false,
  })
  dataObjectArray: object[];

  @ApiProperty({
    type: String,
    required: false,
  })
  dataString: string;

  @ApiProperty({
    type: Array,
    required: false,
  })
  dataStringArray: string[];

  @ApiProperty({
    type: Number,
    required: false,
  })
  dataNumber: number;

  @ApiProperty({
    type: Array,
    required: false,
  })
  dataNumberArray: number[];
}