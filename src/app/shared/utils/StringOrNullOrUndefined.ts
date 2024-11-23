/* eslint-disable @typescript-eslint/no-explicit-any */
class StringOrNullOrUndefinedClass {
  value: any;

  constructor(value?: any) {
    this.value = value;
  }

  static from<T>(value?: T): string | null {
    return value === undefined
      ? undefined
      : value === null
      ? null
      : String(value);
  }
}

// Declarar la interfaz y el constructor
interface StringOrNullOrUndefinedConstructor {
  new (value?: any): string | null;
  <T>(value?: T): string | null;
  readonly prototype: string | null;
}

const StringOrNullOrUndefinedFunction: any = function (value?: any) {
  if (this instanceof StringOrNullOrUndefinedFunction) {
    return new StringOrNullOrUndefinedClass(value);
  } else {
    return StringOrNullOrUndefinedClass.from(value);
  }
};

StringOrNullOrUndefinedFunction.prototype =
  StringOrNullOrUndefinedClass.prototype;
export const StringOrNullOrUndefined: StringOrNullOrUndefinedConstructor =
  StringOrNullOrUndefinedFunction;

export function isString(value: any): value is string {
  return typeof value === 'string';
}
