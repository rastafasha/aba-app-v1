/* eslint-disable @typescript-eslint/no-explicit-any */
class BooleanOrNullOrUndefinedClass {
  value: any;

  constructor(value?: any) {
    this.value = value;
  }

  static from<T>(value?: T): boolean | null {
    return value === undefined
      ? undefined
      : value === null
      ? null
      : typeof value === 'string'
      ? Boolean(value.toLowerCase() === 'true')
      : Boolean(value);
  }
}

// Declarar la interfaz y el constructor
interface BooleanOrNullOrUndefinedConstructor {
  new (value?: any): boolean | null;
  <T>(value?: T): boolean | null;
  readonly prototype: boolean | null;
}

const BooleanOrNullOrUndefinedFunction: any = function (value?: any) {
  if (this instanceof BooleanOrNullOrUndefinedFunction) {
    return new BooleanOrNullOrUndefinedClass(value);
  } else {
    return BooleanOrNullOrUndefinedClass.from(value);
  }
};

BooleanOrNullOrUndefinedFunction.prototype =
  BooleanOrNullOrUndefinedClass.prototype;
export const BooleanOrNullOrUndefined: BooleanOrNullOrUndefinedConstructor =
  BooleanOrNullOrUndefinedFunction;
