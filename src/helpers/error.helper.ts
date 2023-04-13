export const formatNewErrorMessage = (message: string, functionName?: string, className?: string): string => {
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
