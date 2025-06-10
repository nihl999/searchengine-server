import { isDeepStrictEqual } from 'util';

export abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this.validate(value);
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  protected abstract validate(value: T): void;

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (!(vo instanceof this.constructor)) {
      return false;
    }
    return this.deepEquals(this._value, vo._value);
  }

  private deepEquals(a: any, b: any): boolean {
    return isDeepStrictEqual(a, b);
  }

  public toString(): string {
    return JSON.stringify(this._value);
  }
}
