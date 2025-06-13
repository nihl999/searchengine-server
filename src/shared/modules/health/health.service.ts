import { Injectable } from '@nestjs/common';
import Result, { ok } from 'true-myth/result';

@Injectable()
export class HealthService {
  getLiveness(): Result<string, void> {
    return ok('live');
  }
}
