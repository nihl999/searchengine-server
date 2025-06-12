import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getLiveness(): unknown {
    return {
      status: 'live',
      timestamp: new Date().toISOString(),
    };
  }
}
