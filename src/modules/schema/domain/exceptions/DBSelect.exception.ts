import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/modules/ddd/domain/exception';

export class DBSelectError extends BaseException {
  protected _key: string = DBSelectError.name;
  constructor(message: string, stack?: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, stack);
  }
}
