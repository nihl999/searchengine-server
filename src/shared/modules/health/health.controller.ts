import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller({ version: VERSION_NEUTRAL })
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHello(): unknown {
    return this.healthService.getLiveness();
  }
}
