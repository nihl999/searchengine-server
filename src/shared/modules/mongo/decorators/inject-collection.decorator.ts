import { Inject } from '@nestjs/common';
import { mountCollectionProviderToken } from '../helpers/mountToken';

export const DbCollection = (name: string, connectionName?: string) =>
  Inject(mountCollectionProviderToken(name, connectionName));
