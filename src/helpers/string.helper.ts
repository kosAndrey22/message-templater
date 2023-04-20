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

export const onlyFirstLetterToUpper = (str: string): string => {
  const firstLetter = str[0];
  const otherLetters = str.substring(1, str.length);
  const newString = firstLetter.toUpperCase() + otherLetters.toLowerCase();
  return newString;
};

export const removeInvalidChars = (str: string): string => {
  return str.replace(
    /\u000A|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]|/g,
    '',
  );
};
