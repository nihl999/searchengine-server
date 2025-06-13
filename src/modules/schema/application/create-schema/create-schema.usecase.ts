import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { Usecase } from 'src/shared/modules/ddd/application/usecase';
import { DbCollection } from 'src/shared/modules/mongo/decorators/inject-collection.decorator';
import { err, ok } from 'true-myth/result';
import { fromPromise } from 'true-myth/task';
import {
  CreateSchemaUsecaseInput,
  CreateSchemaUsecaseOutput,
} from './create-schema.dto';
import { DBInsertError } from '../../domain/exceptions/DBInsert.exception';
import { AuthSession } from 'src/shared/modules/auth/session.mock';

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
  protected async onExecute(
    props: CreateSchemaUsecaseInput,
    session: AuthSession,
  ) {
    const insertOneResult = await fromPromise(
      this.schemaCollection.insertOne({
        org_id: session.user.id,
        schemaName: props.name,
        fields: props.fields,
      }),
    );
    if (insertOneResult.isErr) {
      return err(
        new DBInsertError(
          'Error inserting a new Schema on database',
          (insertOneResult.error as Error).stack,
        ),
      );
    }
    return ok({ id: insertOneResult.value.insertedId.toString() });
  }
}
