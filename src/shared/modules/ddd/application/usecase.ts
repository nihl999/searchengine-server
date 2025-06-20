import { Logger } from '@nestjs/common';
import { Result } from 'true-myth';
import { BaseException } from '../domain/exception';
import { AuthSession } from '../../auth/session.mock';

export type ResultAsync<A, B> = Promise<Result<A, B>>;

export abstract class Usecase<Input, Output, Error extends BaseException> {
  protected logger: Logger;
  private usecaseName: string;
  constructor(name: string) {
    this.logger = new Logger(name);
    this.usecaseName = name;
  }
  public async execute(
    props: Input,
    session?: AuthSession,
  ): ResultAsync<Output, Error> {
    this.logger.log(`${this.usecaseName} started executing!`);
    const result = await this.onExecute(props, session);
    if (result.isOk) {
      this.logger.log(
        `${this.usecaseName} ended executions without throwing errors!`,
      );
      return result;
    }

    this.logger.error(
      `${this.usecaseName} ended with error -> ${result.error.toString()}`,
      result.error,
    );
    return result;
  }

  protected abstract onExecute(
    props: Input,
    session?: AuthSession,
  ): ResultAsync<Output, Error>;
}
