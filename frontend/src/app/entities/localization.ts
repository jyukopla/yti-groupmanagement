export interface Localization {
  lang: string;
  value: string;
}

export type Localizable = { [language: string]: string; };
