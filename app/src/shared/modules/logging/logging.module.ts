import { Module, Global } from '@nestjs/common';
import { AppLogger } from './logging.service';
import { WinstonModule } from 'nest-winston';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({}),
  ],
  providers: [
    {
      provide: 'AppLogger',
      useClass: AppLogger,
    },
  ],
  exports: [AppLogger],
})
export class LoggerModule {}
