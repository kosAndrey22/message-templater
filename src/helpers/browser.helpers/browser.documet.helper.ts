const DEFAULT_CLICK_DELAY_MS = 1000;
const DOCUMENT_COMMANDS = {
  DELETE: 'delete',
  INSERT_TEXT: 'insertText',
  SELECT_ALL: 'selectAll',
};

export const click = (element: HTMLElement): void => {
  return element.click();
};

export const clickWithDelayAfter = async (element: HTMLElement, delay: number = DEFAULT_CLICK_DELAY_MS): Promise<void> => {
  click(element);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return;
};

export const findPageElementsById = (id: string): HTMLElement => {
  const matchingElement = document.getElementById(id);
  return matchingElement;
};

export const findPageElementsByClassName = (className: string): HTMLElement[] => {
  const matchingElements = document.getElementsByClassName(className);
  const arrayOfMatchinElements = [].slice.call(matchingElements);
  return arrayOfMatchinElements;
};

export const addClassToElemetClassList = (element: HTMLElement, className: string): void => {
  element.classList.add(className);
};

export const removeClassFromElemetClassList = (element: HTMLElement, className: string): void => {
  element.classList.remove(className);
};

export const clearElementText = (element: HTMLElement): void => {
  element.focus();
  document.execCommand(DOCUMENT_COMMANDS.SELECT_ALL, false);
  document.execCommand(DOCUMENT_COMMANDS.DELETE, false);
};

export const addElementText = (element: HTMLElement, text: string): void => {
  element.focus();
  document.execCommand(DOCUMENT_COMMANDS.INSERT_TEXT, false, text);
};

export const setElementText = (element: HTMLElement, text: string): void => {
  clearElementText(element);
  addElementText(element, text);
};

export const getDocumentUrl = (): string => {
  return document.URL;
};

export const findChildsInsideElementRecursively = (
  element: HTMLElement | null,
  matchCondition: (element: HTMLElement) => boolean,
): HTMLElement[] => {
  if (!element) {
    return [];
  };

  const matches = [];
  const match = matchCondition(element);

  if (match) {
    matches.push(element);
  }
  for (let i = 0; i < element.children.length; i += 1) {
    const childMatches = findChildsInsideElementRecursively(<HTMLElement>element.children[i], matchCondition);
    matches.push(...childMatches);
  }
  return matches;
};
