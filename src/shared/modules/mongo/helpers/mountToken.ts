export const mountClientToken = (connectionName?: string) =>
  `MONGO_CLIENT_${connectionName?.toUpperCase() ?? 'DEFAULT'}`;
export const mountDbToken = (connectionName?: string) =>
  `MONGO_DB_${connectionName?.toUpperCase() ?? 'DEFAULT'}`;
export const mountCollectionProviderToken = (
  collection: string,
  connectionName?: string,
) =>
  `MONGO_DB_${connectionName?.toUpperCase() ?? 'DEFAULT'}_${collection?.toUpperCase()}`;
