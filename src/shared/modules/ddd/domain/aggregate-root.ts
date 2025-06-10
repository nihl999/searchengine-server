import { Entity } from './entity';
import { UniqueIdentifier } from './unique-identifier';

export abstract class AggregateRoot<TId = string> extends Entity<TId> {
  private _version: number = 0;

  protected constructor(id?: UniqueIdentifier<TId>) {
    super(id);
  }

  public get version(): number {
    return this._version;
  }

  protected incrementVersion(): void {
    this._version++;
  }

  protected executeBusinessLogic(operation: () => void): void {
    operation();
    this.incrementVersion();
  }
}

type ExtractIdType<T> = T extends AggregateRoot<infer TId> ? TId : never;

export interface IRepository<TEntity extends AggregateRoot<any>> {
  findById(id: ExtractIdType<TEntity>): Promise<TEntity | null>;
  save(entity: TEntity): Promise<void>;
  delete(entity: TEntity): Promise<void>;
}
