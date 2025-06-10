import { DynamicModule, Module, Provider } from '@nestjs/common';
import * as mongo from 'mongodb';
import {
  mountClientToken,
  mountDbToken,
  mountCollectionProviderToken,
} from './helpers/mountToken';

export type RootMongoModuleOptions = {
  uri?: string;
  database?: string;
  connectionName?: string;
} & mongo.MongoClientOptions;

export type FeatureMongoModuleOptions = {
  connectionName?: string;
  collections: string[];
};

/*TODO Currently this supports 1 DB per Module + need connectionName if with multiple modules. 
This can be reworked to support multiples DBs per connection, 
still needing the connection name
*/
@Module({})
export class MongoModule {
  static forRoot(options: RootMongoModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: mountClientToken(options.connectionName),
        async useFactory() {
          const client = new mongo.MongoClient(
            options.uri ?? 'mongodb://localhost:27017',
            {
              ...options,
            },
          );
          await client.connect();
          return client;
        },
      },
      {
        provide: mountDbToken(options.connectionName),
        useFactory(client: mongo.MongoClient) {
          return client.db(options.database ?? 'test');
        },
        inject: ['MONGO_CLIENT'],
      },
    ];
    return {
      module: MongoModule,
      providers: providers,
      exports: providers,
    };
  }
  static forFeature(options: FeatureMongoModuleOptions): DynamicModule {
    const collectionProviders: Provider[] = options.collections.map(
      (collection): Provider => {
        return {
          provide: mountCollectionProviderToken(
            collection,
            options.connectionName,
          ),
          useFactory(db: mongo.Db) {
            return db.collection(collection);
          },
          inject: [mountDbToken(options.connectionName)],
        };
      },
    );
    return {
      module: MongoModule,
      providers: collectionProviders,
      exports: collectionProviders,
    };
  }
}
