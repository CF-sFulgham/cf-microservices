import { Injectable } from '@nestjs/common';
import { Config } from '../../config/config.service';
import { Content } from '../models/content';
import { ContentQuery } from '../models/content.qurey';

@Injectable()
export class ContentService {
  private isMock;

  constructor() {
    this.isMock = Config.get('mock');
  }

  async getContent(query: ContentQuery): Promise<Content> {
    const service = this.isMock ? query.serviceMock: query.service;
    const content = new Content();
    content.dataObject = await service[query.action]();
    return content;
  }
}