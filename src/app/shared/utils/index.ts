/* eslint-disable @typescript-eslint/no-explicit-any */

import { Type } from '@angular/core';

//@index('./*.ts', f => `export * from '${f.path}';`)
export * from './BooleanOrNullOrUndefined';
export * from './DateOrNullOrUndefined';
export * from './NumberOrNullOrUndefined';
export * from './StringOrNullOrUndefined';
//@endindex

export function compareObjects(obj1: object, obj2: object): object {
  const differences: object = {};
  function compare(obj1: object, obj2: object, prefix = '') {
    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (
          typeof value1 === 'object' &&
          value1 !== null &&
          typeof value2 === 'object' &&
          value2 !== null
        ) {
          compare(value1, value2, `${prefix}${key}.`);
        } else if (value1 !== value2) {
          differences[`${prefix}${key}`] = { obj1: value1, obj2: value2 };
        }
      }
    }
    for (const key in obj2) {
      if (
        Object.prototype.hasOwnProperty.call(obj2, key) &&
        !Object.prototype.hasOwnProperty.call(obj1, key)
      ) {
        if (obj2[key] !== undefined)
          differences[`${prefix}${key}`] = { obj1: undefined, obj2: obj2[key] };
      }
    }
  }
  compare(obj1, obj2);
  return differences;
}
export function logTable(a: object, b: object) {
  console.table(compareObjects(a, b));
}

export function ArrayOrNullOrUndefined<T>(value: T[]): T[] | null {
  return value === undefined
    ? undefined
    : value === null
    ? null
    : (value as any) === 'null'
    ? null
    : (value as any) === 'undefined'
    ? undefined
    : (value as any) === '[]'
    ? []
    : typeof (value as any) === 'string'
    ? JSON.parse(value as any)
    : (value as T[]);
}
export function ForceArray<T>(value: T[]): T[] {
  return ArrayOrNullOrUndefined(value) ?? [];
}

export function ForceMap<T>(value: T[], constructor: Type<T>): T[] {
  return ForceArray<T>(value).map((item) => new constructor(item));
}

export function TypeOrNullOrUndefined<T>(value: T, constructor: Type<T>): T {
  return value === undefined || value === 'undefined'
    ? undefined
    : value === null || value === 'null'
    ? null
    : new constructor(value);
}
