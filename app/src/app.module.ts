import { Injectable, Module } from '@nestjs/common';
import { RbsStatusModule } from './modules/rbsStatus/rbsStatus.module';
import { LoggerModule } from './shared/modules/logging/logging.module';
import { ConfigModule } from './shared/modules/config/config.module';
import { TerminusModule } from '@nestjs/terminus';
import { ContentModule } from './shared/modules/content/content.module';
import { HealthModule } from './modules/health/health.module';

@Injectable()
@Module({
  imports: [
    HealthModule,
    RbsStatusModule,
    LoggerModule,
    ConfigModule,
    TerminusModule,
    ContentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
