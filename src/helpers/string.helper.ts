import { ZERO_WIDTH_JOINER_CHAR_CODE } from '../constants';

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

export const setFirstLetterToUpperCase = (str: string): string => {
  const firstLetter = str[0];
  const otherLetters = str.substring(1, str.length);
  const newString = firstLetter.toUpperCase() + otherLetters.toLowerCase();
  return newString;
};

export const setFirstAndAfterSpecialCharsLettersToUpperCase = (str: string): string => {
  const splitted = str.split('-');
  const formatted = splitted.map((s) => setFirstLetterToUpperCase(s));
  return formatted.join('-');
};

export const removeInvalidChars = (str: string): string => {
  return str.replace(
    /\u000A|[\u2580-\u27BF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD10-\uDDFF]|[\uE000-\uF8FF]/g,
    '',
  );
};

export const stringEmprtyOrContainsOnlyZeroWidthJoiners = (str: string): boolean => {
  const chars = str.split('');
  const withoutZeroJoiners = chars.filter((el) => el !== String.fromCharCode(ZERO_WIDTH_JOINER_CHAR_CODE));
  return withoutZeroJoiners.length === 0;
};

export const stringContainsInvalidCharsOnly = (str: string): boolean => {
  const withoutInvalidChars = removeInvalidChars(str);
  const isEmpty = stringEmprtyOrContainsOnlyZeroWidthJoiners(withoutInvalidChars);
  return isEmpty;
};
