export interface Template {
  id: number;
  title: string;
  text: string;
  pinned: boolean;
}

export interface TemplateToAdd {
  title: string;
  text: string;
  pinned: boolean;
}

export interface TemplateToExport {
  title: string;
  text: string;
  pinned: boolean;
}
