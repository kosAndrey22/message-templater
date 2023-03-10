const DEFAULT_CLICK_DELAY_MS = 1000;
const DOCUMENT_COMMANDS = {
  INSERT_TEXT_COMMAND: 'insertText',
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

export const insertTextToElement = (element: HTMLElement, text: string): void => {
  element.focus();
  document.execCommand(DOCUMENT_COMMANDS.INSERT_TEXT_COMMAND, false, text);
};

export const getDocumentUrl = (): string => {
  return document.URL;
};
