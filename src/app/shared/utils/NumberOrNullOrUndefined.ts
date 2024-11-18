/* eslint-disable @typescript-eslint/no-explicit-any */
class NumberOrNullOrUndefinedClass {
  value: any;

  constructor(value?: any) {
    this.value = value;
  }

  static from<T>(value?: T): number | null {
    return value === undefined
      ? undefined
      : value === null
      ? null
      : Number(value);
  }
}

// Declarar la interfaz y el constructor
interface NumberOrNullOrUndefinedConstructor {
  new (value?: any): number | null;
  <T>(value?: T): number | null;
  readonly prototype: number | null;
}

const NumberOrNullOrUndefinedFunction: any = function (value?: any) {
  if (this instanceof NumberOrNullOrUndefinedFunction) {
    return new NumberOrNullOrUndefinedClass(value);
  } else {
    return NumberOrNullOrUndefinedClass.from(value);
  }
};

NumberOrNullOrUndefinedFunction.prototype =
  NumberOrNullOrUndefinedClass.prototype;
export const NumberOrNullOrUndefined: NumberOrNullOrUndefinedConstructor =
  NumberOrNullOrUndefinedFunction;
