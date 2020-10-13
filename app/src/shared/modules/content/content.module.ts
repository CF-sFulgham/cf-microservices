import { ContentService } from './services/content.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  exports: [ContentService],
  providers: [
    {
      provide: 'ContentService',
      useClass: ContentService,
    },
  ],
})
export class ContentModule {}