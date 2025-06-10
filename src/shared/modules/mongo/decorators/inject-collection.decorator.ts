import { Inject } from '@nestjs/common';
import { mountCollectionProviderToken } from '../helpers/mountToken';

export const InjectDb = (name: string, connectionName?: string) =>
  Inject(mountCollectionProviderToken(name, connectionName));
