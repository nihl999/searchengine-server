import { UniqueIdentifier } from './unique-identifier';

export abstract class Entity<TId = string> {
  protected readonly _id: UniqueIdentifier<TId>;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  protected constructor(id?: UniqueIdentifier<TId>) {
    this._id = id || (UniqueIdentifier.create() as UniqueIdentifier<TId>);
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): UniqueIdentifier<TId> {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }

  equals(other: Entity<TId>): boolean {
    if (!other) return false;
    if (this === other) return true;
    return this._id.equals(other._id);
  }

  public toString(): string {
    return `${this.constructor.name}(${this._id.toString()})`;
  }
}
