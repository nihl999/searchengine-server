import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { Usecase } from 'src/shared/modules/ddd/application/usecase';
import { DbCollection } from 'src/shared/modules/mongo/decorators/inject-collection.decorator';
import { err, ok } from 'true-myth/result';
import { fromPromise } from 'true-myth/task';
import { DBNotFoundError } from '../../domain/exceptions/DBNotFound.exception';
import { GetAllSchemasOutput } from './get-all-schema.dto';

@Injectable()
export class GetAllSchemasQuery extends Usecase<
  void,
  GetAllSchemasOutput,
  DBNotFoundError
> {
  constructor(
    @DbCollection('schemas') private readonly schemaCollection: Collection,
  ) {
    super(GetAllSchemasQuery.name);
  }
  protected async onExecute() {
    const insertOneResult = await fromPromise(
      this.schemaCollection.find().limit(10).toArray(),
    );
    if (insertOneResult.isErr) {
      return err(
        new DBNotFoundError(
          'No schemas found',
          (insertOneResult.error as Error).stack,
        ),
      );
    }
    return ok({
      ids: insertOneResult.value.map((document) => document._id.toString()),
    });
  }
}
