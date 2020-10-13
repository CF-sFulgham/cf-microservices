import { ConfigService } from './config.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}