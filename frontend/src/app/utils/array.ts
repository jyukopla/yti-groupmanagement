export function index<T, TIndex>(items: T[], indexExtractor: (item: T) => TIndex): Map<TIndex, T> {
  const result = new Map<TIndex, T>();

  for (const item of items) {
    result.set(indexExtractor(item), item);
  }

  return result;
}
