import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { RbsStatusHealthService } from './services/rbsStatus.health.service'
import { RbsStatusService } from '../rbsStatus/services/rbsStatus.service';
import { RbsStatusMockService } from '../rbsStatus/services/rbsStatus.mock.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    RbsStatusHealthService,
    RbsStatusService,
    RbsStatusMockService
  ],
})

export class HealthModule {}
