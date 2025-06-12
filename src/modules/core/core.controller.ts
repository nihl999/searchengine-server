import { Controller, Get } from '@nestjs/common';
import { HealthService } from './core.service';

@Controller({ version: '1' })
export class CoreController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHello(): unknown {
    return this.healthService.getLiveness();
  }
}
