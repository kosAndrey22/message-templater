const interpDataRegExp = /{[^{]{0,}}/g;

export const interpolate = (str: string, values: { [key: string]: string }): string => {
  let newStr = str;
  const interpDataIterator = str.matchAll(interpDataRegExp);
  let next = interpDataIterator.next();
  while (!next.done) {
    const pattern: string = next.value[0];
    const paternObjectKey = pattern.substring(1, pattern.length - 1);
    const value = values[paternObjectKey];
    if (value) {
      newStr = newStr.replace(pattern, value);
    }
    next = interpDataIterator.next();
  }
  return newStr;
};
