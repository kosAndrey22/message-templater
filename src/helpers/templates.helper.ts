import { TEMPLATES_STORAGE_KEY } from '../constants';
import { Template } from '../interfaces';
import { getFromBrowserStorage, setToBrowserStorage } from './';

export const getSavedTemplates = async (): Promise<Template[]> => {
  const templates = await getFromBrowserStorage<Template[]>(TEMPLATES_STORAGE_KEY);
  return templates ?? [];
};

export const saveTemplates = async (templates: Template[]): Promise<void> => {
  await setToBrowserStorage<Template[]>(TEMPLATES_STORAGE_KEY, templates);
};

export const saveNewTemplates = async (newTemplatesData: Omit<Template, 'id'> | Omit<Template, 'id'>[], override: boolean = false): Promise<void> => {
  let newTemplates: Template[] = [];
  if (newTemplatesData instanceof Array) {
    newTemplates.push(
      ...newTemplatesData.map(({ title, text, pinned }) => ({
        title,
        text,
        pinned,
        id: new Date().getTime(),
      })),
    );
  } else {
    const { title, text, pinned } = newTemplatesData;
    newTemplates.push({
      title,
      text,
      pinned,
      id: new Date().getTime(),
    });
  }
  if (override) {
    await saveTemplates(newTemplates);
  } else {
    const templates = await getSavedTemplates();
    templates.push(...newTemplates);
    await saveTemplates(templates);
  }
};

export const updateTemplateById = async (id: Template['id'], updateTemplateData: Partial<Template>): Promise<void> => {
  const templates = await getSavedTemplates();
  const updatedTemplateIndex = templates.findIndex((t) => t.id === id);
  templates[updatedTemplateIndex] = {
    ...templates[updatedTemplateIndex],
    ...updateTemplateData,
  };
  await saveTemplates(templates);
};

export const deleteTemplate = async (templateId: number): Promise<void> => {
  const templates = await getSavedTemplates();
  const templateToDeleteIndex = templates.findIndex((t) => t.id === templateId);
  const newTemplates = [...templates.slice(0, templateToDeleteIndex), ...templates.slice(templateToDeleteIndex + 1)];
  await saveTemplates(newTemplates);
};
