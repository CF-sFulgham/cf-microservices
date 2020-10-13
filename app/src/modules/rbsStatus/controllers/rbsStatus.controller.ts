import {Controller, HttpCode, Get, Inject} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RbsStatusService } from '../services/rbsStatus.service';
import { RbsStatusMockService } from '../services/rbsStatus.mock.service';
import { RbsStatusMapperService } from '../services/rbsStatus.mapper.service';
import { ContentService } from '../../../shared/modules/content/services/content.service';
import { ContentQuery } from '../../../shared/modules/content/models/content.qurey';
import { RbsStatus } from '../models/rbsStatus';

@Controller('statuses')
@ApiTags('statuses')
export class RbsStatusController {
  constructor(
    private readonly StatusService: RbsStatusService,
    private readonly StatusMockService: RbsStatusMockService,
    private readonly StatusMapperService: RbsStatusMapperService,
    @Inject(ContentService) private contentService: ContentService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return 0 or more statuses',
  })
  @ApiResponse({
    status: 400,
    description: 'Fields missing or malformed.',
  })
  @ApiResponse({
    status: 401,
    description: 'User credentials not valid.',
  })
  public async getAllStatuses(): Promise<RbsStatus[]> {
    const query = new ContentQuery();
    query.service = this.StatusService;
    query.serviceMock = this.StatusMockService;
    query.action = 'getAllStatuses';

    const data = await this.contentService.getContent(query);

    return this.StatusMapperService.mapStatuses(data.dataObject).statuses;
  }

}
