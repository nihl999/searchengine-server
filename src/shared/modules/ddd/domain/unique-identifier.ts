export class UniqueIdentifier<T = string> {
  private readonly _value: T;

  constructor(value: T) {
    if (value === null || value === undefined) {
      throw new Error('UniqueIdentifier value cannot be null or undefined');
    }
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  equals(other: UniqueIdentifier<T>): boolean {
    if (!other) return false;
    return this._value === other._value;
  }

  toString(): string {
    return String(this._value);
  }

  static create(): UniqueIdentifier<string> {
    return new UniqueIdentifier(crypto.randomUUID());
  }

  static from<T>(value: T): UniqueIdentifier<T> {
    return new UniqueIdentifier(value);
  }
}
