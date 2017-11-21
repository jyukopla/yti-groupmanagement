export function requireDefined<T>(obj: T|null|undefined): T {
  if (obj === null || obj === undefined) {
    throw new Error('Object must not be null or undefined');
  }
  return obj;
}
