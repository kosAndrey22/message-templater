type ErrorObject = {
  message: string;
  functionName?: string;
  className?: string;
};

export const formatErrorMessage = ({ message, functionName, className }: ErrorObject): string => {
  return VERBOSE ? getFullMessage(message, functionName, className) : getShortMessage(message);
};

const getFullMessage = (message: string, functionName?: string, className?: string): string => {
  let msg = '';
  if (className) {
    msg += `${className}.`;
  }
  if (functionName) {
    msg += `${functionName}::`;
  }
  msg += message;
  return msg;
};

const getShortMessage = (message: string): string => {
  return message;
};
