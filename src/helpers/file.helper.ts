export const downloadFile = (fileName: string, fileContent: string): void => {
  const file = new Blob([fileContent], { type: 'text/json' });
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(file);
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.onclick = () => {
    // revokeObjectURL needs a delay to work properly
    setTimeout(() => {
      window.URL.revokeObjectURL(downloadLink.href);
    }, 0);
  };
  downloadLink.click();
  downloadLink.remove();
};

export const uploadFile = async (): Promise<string> => {
  let fileContent: string = '';

  const fileChooser = document.createElement('input');
  fileChooser.type = 'file';
  fileContent = await new Promise((resolve) => {
    fileChooser.addEventListener('change', async () => {
      const file = fileChooser.files[0];
      const content = await file.text();
      resolve(content);
    });
    fileChooser.click();
    fileChooser.remove();
  });
  return fileContent;
};
