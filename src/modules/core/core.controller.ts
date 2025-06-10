import { Controller, Get } from '@nestjs/common';
import { HelloService } from './core.service';

@Controller()
export class CoreController {
  constructor(private readonly appService: HelloService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
