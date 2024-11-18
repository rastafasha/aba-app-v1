//@index('./*.ts', f => `export * from '${f.path}';`)
export * from './NumberOrNull';
export * from './StringOrNull';

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
