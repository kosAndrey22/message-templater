import { TEMPLATES_STORAGE_KEY } from '../constants';
import { Template, TemplateToAdd, TemplateToExport } from '../interfaces';
import { downloadFile, uploadFile } from './file.helper';
import { getFromBrowserStorage, setToBrowserStorage } from './';

export const generateTemplateId = (): number => {
  return new Date().getTime();
};

export const getSavedTemplates = async (): Promise<Template[]> => {
  const templates = await getFromBrowserStorage<Template[]>(TEMPLATES_STORAGE_KEY);
  return templates ?? [];
};

export const getSavedTemplatesForExport = async (): Promise<TemplateToExport[]> => {
  const templates = await getSavedTemplates();
  const templatesForExport = templates.map((t) => ({
    title: t.title,
    text: t.text,
    pinned: t.pinned,
  }));
  return templatesForExport;
};

export const saveTemplatesToStorage = async (templates: Template[]): Promise<void> => {
  await setToBrowserStorage<Template[]>(TEMPLATES_STORAGE_KEY, templates);
};

export const createNewTemplates = async (
  newTemplatesData: TemplateToAdd | TemplateToAdd[],
  override: boolean = false,
): Promise<void> => {
  let newTemplatesDataArray: TemplateToAdd[] = [];

  if (newTemplatesData instanceof Array) {
    newTemplatesDataArray = newTemplatesData;
  } else {
    newTemplatesDataArray = [newTemplatesData];
  }

  const newTemplates: Template[] = newTemplatesDataArray.map((t, i) => {
    const { title, text, pinned } = t;
    return {
      title,
      text,
      pinned,
      id: generateTemplateId() + i,
    };
  });

  if (override) {
    await saveTemplatesToStorage(newTemplates);
  } else {
    const templates = await getSavedTemplates();
    const filteredNewTemplates = newTemplates.filter((nt) => !templates.some((t) => t.id === nt.id));
    templates.push(...filteredNewTemplates);
    await saveTemplatesToStorage(templates);
  }
};

export const updateTemplateById = async (id: Template['id'], updateTemplateData: Partial<Template>): Promise<void> => {
  const templates = await getSavedTemplates();
  const updatedTemplateIndex = templates.findIndex((t) => t.id === id);
  templates[updatedTemplateIndex] = {
    ...templates[updatedTemplateIndex],
    ...updateTemplateData,
  };
  await saveTemplatesToStorage(templates);
};

export const deleteTemplate = async (templateId: number): Promise<void> => {
  const templates = await getSavedTemplates();
  const templateToDeleteIndex = templates.findIndex((t) => t.id === templateId);
  const newTemplates = [...templates.slice(0, templateToDeleteIndex), ...templates.slice(templateToDeleteIndex + 1)];
  await saveTemplatesToStorage(newTemplates);
};

export const exportTemplates = async (): Promise<void> => {
  const savedTemplates = await getSavedTemplatesForExport();
  const stringifiedTemplates = JSON.stringify(savedTemplates, null, 2);
  const fileName = `Templates exports ${new Date().getTime()}.json`;
  downloadFile(fileName, stringifiedTemplates);
};

export const importTemplates = async (overrideOnImport: boolean): Promise<void> => {
  const fileContent = await uploadFile();
  const parsed = JSON.parse(fileContent);
  await createNewTemplates(parsed, overrideOnImport);
};
