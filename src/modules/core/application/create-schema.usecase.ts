import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { Usecase } from 'src/shared/modules/ddd/application/usecase';
import { DbCollection } from 'src/shared/modules/mongo/decorators/inject-collection.decorator';
import { DBInsertError } from '../domain/exceptions/DBInsertError.exception';
import {
  CreateSchemaUsecaseInput,
  CreateSchemaUsecaseOutput,
} from './create-schema.dto';
import { tryOrElse } from 'true-myth/task';
import { ok, err } from 'true-myth/result';

@Injectable()
export class CreateSchemaUsecase extends Usecase<
  CreateSchemaUsecaseInput,
  CreateSchemaUsecaseOutput,
  DBInsertError
> {
  constructor(
    @DbCollection('schemas') private readonly schemaCollection: Collection,
  ) {
    super(CreateSchemaUsecase.name);
  }
  protected async onExecute(props: CreateSchemaUsecaseInput) {
    const insertOneResult = await tryOrElse(
      (error: Error) => {
        return new DBInsertError(
          'Error inserting a new Schema on database',
          error.stack,
        );
      },
      () =>
        this.schemaCollection.insertOne({
          schemaName: props.name,
          fields: props.fields,
        }),
    );
    if (insertOneResult.isErr) {
      return err(insertOneResult.error);
    }
    return ok({ id: insertOneResult.value.insertedId.toString() });
  }
}
