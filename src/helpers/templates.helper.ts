import { TEMPLATES_STORAGE_KEY } from '../constants';
import { Template } from '../interfaces';
import { PartialBy } from '../types';
import { getFromBrowserStorage, setToBrowserStorage } from './';

export const getSavedTemplates = async (): Promise<Template[]> => {
  const templates = await getFromBrowserStorage<Template[]>(TEMPLATES_STORAGE_KEY);
  return templates ?? [];
};

export const saveTemplates = async (templates: Template[]): Promise<void> => {
  await setToBrowserStorage<Template[]>(TEMPLATES_STORAGE_KEY, templates);
};

export const saveNewTemplates = async (
  newTemplatesData: PartialBy<Template, 'id'> | PartialBy<Template, 'id'>[],
  override: boolean = false,
): Promise<void> => {
  let newTemplatesDataArray: PartialBy<Template, 'id'>[] = [];

  if (newTemplatesData instanceof Array) {
    newTemplatesDataArray = newTemplatesData;
  } else {
    newTemplatesDataArray = [newTemplatesData];
  }

  const newTemplates: Template[] = newTemplatesDataArray.map((t) => {
    const { title, text, pinned, id } = t;
    return {
      title,
      text,
      pinned,
      id: id || new Date().getTime(),
    };
  });

  if (override) {
    await saveTemplates(newTemplates);
  } else {
    const templates = await getSavedTemplates();
    const filteredNewTemplates = newTemplates.filter((nt) => !templates.some((t) => t.id === nt.id));
    templates.push(...filteredNewTemplates);
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
