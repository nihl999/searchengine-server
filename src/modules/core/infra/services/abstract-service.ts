import { Logger } from '@nestjs/common';

export class AbstractService {
  logger: Logger;
  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
}
