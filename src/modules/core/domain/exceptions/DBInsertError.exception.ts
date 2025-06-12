import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/modules/ddd/domain/exception';

export class DBInsertError extends BaseException {
  protected _key: string = DBInsertError.name;
  constructor(message: string, stack?: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, stack);
  }
}
