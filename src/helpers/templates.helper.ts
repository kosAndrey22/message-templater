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

export const saveNewTemplate = async (newTemplateData: Omit<Template, 'id'>): Promise<void> => {
  const templates = await getSavedTemplates();
  const { title, text, pinned } = newTemplateData;
  const newTemplate: Template = {
    title,
    text,
    pinned,
    id: new Date().getTime(),
  };
  templates.push(newTemplate);
  await saveTemplates(templates);
};

export const updateTemplateById = async (
  id: Template['id'],
  updateTemplateData: Partial<Omit<Template, 'id'>>,
): Promise<void> => {
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
