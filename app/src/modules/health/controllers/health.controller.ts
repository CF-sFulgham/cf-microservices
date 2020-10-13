import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RbsStatusService } from '../../rbsStatus/services/rbsStatus.service';
import { RbsStatusMockService } from '../../rbsStatus/services/rbsStatus.mock.service';
import { RbsStatusHealthService } from '../services/rbsStatus.health.service';
import { ContentService } from '../../../shared/modules/content/services/content.service';
import { ContentQuery } from '../../../shared/modules/content/models/content.qurey';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private readonly StatusService: RbsStatusService,
    private readonly StatusMockService: RbsStatusMockService,
    private readonly rbsHealthService: RbsStatusHealthService,
    @Inject(ContentService) private contentService: ContentService
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck() {
    const query = new ContentQuery();
    query.service = this.StatusService;
    query.serviceMock = this.StatusMockService;
    query.action = 'getAllStatuses';
    const data = await this.contentService.getContent(query);

    return this.health.check([
      async () => this.rbsHealthService.isHealthy('statuses', data),
    ]);
  }
}
