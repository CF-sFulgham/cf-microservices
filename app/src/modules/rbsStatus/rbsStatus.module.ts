import { Module, HttpModule } from '@nestjs/common';
import { RbsStatusService } from './services/rbsStatus.service';
import { RbsStatusMockService } from './services/rbsStatus.mock.service';
import { RbsStatusMapperService } from './services/rbsStatus.mapper.service';
import { RbsStatusController } from './controllers/rbsStatus.controller';

@Module({
  imports: [HttpModule],
  controllers: [RbsStatusController],
  providers: [
    RbsStatusService,
    RbsStatusMockService,
    RbsStatusMapperService,
  ],
})

export class RbsStatusModule {}
