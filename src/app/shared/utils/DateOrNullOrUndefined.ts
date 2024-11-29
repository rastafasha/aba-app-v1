/* eslint-disable @typescript-eslint/no-explicit-any */
class DateOrNullOrUndefinedClass {
  value: any;

  constructor(value?: any) {
    this.value = value;
  }

  static from<T extends number | string | Date>(value?: T): Date | null {
    return value === undefined
      ? undefined
      : value === null
      ? null
      : new Date(value);
  }
}

// Declarar la interfaz y el constructor
interface DateOrNullOrUndefinedConstructor {
  new (value?: any): Date | null;
  <T>(value?: T): Date | null;
  readonly prototype: Date | null;
}

const DateOrNullOrUndefinedFunction: any = function (
  value?: number | string | Date | null
) {
  if (this instanceof DateOrNullOrUndefinedFunction) {
    return new DateOrNullOrUndefinedClass(value);
  } else {
    return DateOrNullOrUndefinedClass.from(value);
  }
};

DateOrNullOrUndefinedFunction.prototype = DateOrNullOrUndefinedClass.prototype;
export const DateOrNullOrUndefined: DateOrNullOrUndefinedConstructor =
  DateOrNullOrUndefinedFunction;

export const fromIsoToDate = (date: Date): string => {
  return date?.toISOString().split('T')[0];
};
