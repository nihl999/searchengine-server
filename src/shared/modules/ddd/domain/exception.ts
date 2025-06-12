import { HttpStatus } from '@nestjs/common';

export abstract class BaseException {
  protected _stack: string;
  protected _message: string;
  protected _statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  protected _key = 'BaseException';

  constructor(message: string, statusCode?: HttpStatus, stack?: string) {
    this._message = message;
    this._statusCode = statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this._stack = stack ?? '';
  }

  //note shouldn't be used
  public toString() {
    return this._message;
  }

  public get statusCode() {
    return this._statusCode;
  }
  public get key() {
    return this._key;
  }
  public get message() {
    return this._message;
  }
}
