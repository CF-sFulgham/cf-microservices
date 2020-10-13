import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';

@Injectable()
export class RbsStatusHealthService extends HealthIndicator {

  async isHealthy(key: string, data: any): Promise<HealthIndicatorResult> {
    const isHealthy = data.length !== 0;
    const statusResult = this.getStatus(key, isHealthy, { statuses: data.length });

    if (isHealthy) {
      return statusResult;
    }

    throw new HealthCheckError('RbsStatus health check failed', data);
  }

}