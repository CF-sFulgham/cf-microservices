import { ApiProperty } from '@nestjs/swagger';
import { IContent } from '../interfaces/content';

export class ContentQuery {
  @ApiProperty({
    type: Object,
    required: true,
  })
  service: IContent;

  @ApiProperty({
    type: Object,
    required: true,
  })
  serviceMock: IContent;

  @ApiProperty({
    type: String,
    required: true,
  })
  action: string;
}