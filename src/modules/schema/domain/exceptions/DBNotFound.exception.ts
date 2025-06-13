import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/modules/ddd/domain/exception';

export class DBNotFoundError extends BaseException {
  protected _key: string = DBNotFoundError.name;
  constructor(message: string, stack?: string) {
    super(message, HttpStatus.NOT_FOUND, stack);
  }
}
