const DEFAULT_CLICK_DELAY_MS = 1000;
const DOCUMENT_COMMANDS = {
  DELETE: 'delete',
  INSERT_TEXT: 'insertText',
};

// Type check section:

export const isInputElemet = (element: HTMLElement): element is HTMLInputElement => {
  return (<HTMLInputElement>element).setSelectionRange !== undefined;
};

// Get elements and their class section:

export const findPageElementById = (id: string): HTMLElement | null => {
  const matchingElement: HTMLElement | null = document.getElementById(id);
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

export const findChildsInsideElementRecursively = (
  element: HTMLElement | null,
  matchCondition: (element: HTMLElement) => boolean,
): HTMLElement[] => {
  if (!element) {
    return [];
  }

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

// Element focus section:

export const focus = (element: HTMLElement): void => {
  element.focus();
};

export const isCursorInside = (element: HTMLElement): boolean => {
  return element.matches(':hover');
};

// Element click section:

export const click = (element: HTMLElement): void => {
  return element.click();
};

export const clickWithDelayAfter = async (
  element: HTMLElement,
  delay: number = DEFAULT_CLICK_DELAY_MS,
): Promise<void> => {
  click(element);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return;
};

// Element text section:

export const selectAllDocumentText = (element: HTMLElement): void => {
  if (!isInputElemet(element)) {
    return;
  }
  focus(element);
  element.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
};

export const clearElementText = (element: HTMLElement): void => {
  if (!isInputElemet(element)) {
    return;
  }
  focus(element);
  selectAllDocumentText(element);
  document.execCommand(DOCUMENT_COMMANDS.DELETE, false);
};

export const addElementText = (element: HTMLElement, text: string): void => {
  focus(element);
  document.execCommand(DOCUMENT_COMMANDS.INSERT_TEXT, false, text);
};

export const setElementText = (element: HTMLElement, text: string): void => {
  clearElementText(element);
  addElementText(element, text);
};

export const moveCaretToTextStart = (element: HTMLElement): void => {
  if (!isInputElemet(element)) {
    return;
  }
  focus(element);
  element.setSelectionRange(0, 0);
};

export const moveCaretToTextEnd = (element: HTMLElement): void => {
  if (!isInputElemet(element)) {
    return;
  }
  focus(element);
  element.setSelectionRange(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

export const getElementCaretPosition = (element: HTMLElement): number => {
  if (!isInputElemet(element)) {
    return;
  }
  return element.selectionEnd;
};

// Document data section:

export const getDocumentUrl = (): string => {
  return document.URL;
};

// Scroll section:

export const scrollToElementStart = (element: HTMLElement): void => {
  focus(element);
  element.scrollTop = 0;
};

export const scrollToElementEnd = (element: HTMLElement): void => {
  focus(element);
  element.scrollTop = Number.MAX_SAFE_INTEGER;
};

// Elements events section
export const addMouseEnterListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  func: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
): void => {
  element.addEventListener('mouseenter', func);
};

export const removeMouseEnterListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  func: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
): void => {
  element.removeEventListener('mouseenter', func);
};

export const addMouseOutListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  func: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
): void => {
  element.addEventListener('mouseout', func);
};

export const removeMouseOutListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  func: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
): void => {
  element.removeEventListener('mouseout', func);
};

// Document events section
export const addDocumentDomLoadListener = (listener: EventListenerOrEventListenerObject): void => {
  document.addEventListener('DOMContentLoaded', listener);
};
