import { TEMPLATES_STORAGE_KEY } from '../constants';
import { Template } from '../interfaces';

export const getSavedTemplates = async (): Promise<Template[]> => {
  const storage = await chrome.storage.local.get(TEMPLATES_STORAGE_KEY);
  return storage[TEMPLATES_STORAGE_KEY] ?? [];
};

export const saveTemplates = async (templates: Template[]): Promise<void> => {
  await chrome.storage.local.set({ [TEMPLATES_STORAGE_KEY]: templates });
};

export const saveNewTemplate = async (newTemplateText: string): Promise<void> => {
  const templates = await getSavedTemplates();
  const newTemplate: Template = { text: newTemplateText, id: new Date().getTime() };
  templates.push(newTemplate);
  await saveTemplates(templates);
};

export const deleteTemplate = async (templateId: number): Promise<void> => {
  const templates = await getSavedTemplates();
  const templateToDeleteIndex = templates.findIndex((t) => t.id === templateId);
  const newTemplates = [...templates.slice(0, templateToDeleteIndex), ...templates.slice(templateToDeleteIndex + 1)];
  await saveTemplates(newTemplates);
};
