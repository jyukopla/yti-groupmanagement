import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Subject } from 'rxjs/Subject';
import { Localizable } from 'yti-common-ui/types/localization';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export type Language = string;

export interface Localizer {
  translate(localizable: Localizable): string;
}

@Injectable()
export class LanguageService implements Localizer {

  language$ = new BehaviorSubject<Language>('fi');

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['fi', 'en']);
    translateService.setDefaultLang('en');

    this.language$.subscribe(lang => this.translateService.use(lang));
  }

  get language(): Language {
    return this.language$.getValue();
  }

  set language(language: Language) {
    if (this.language !== language) {
      this.language$.next(language);
    }
  }

  translate(localizable: Localizable) {

    if (!localizable) {
      return '';
    }

    const primaryLocalization = localizable[this.language];

    if (primaryLocalization) {
      return primaryLocalization;
    } else {

      for (const [language, value] of Object.entries(localizable)) {
        if (value) {
          return `${value} (${language})`;
        }
      }

      return '';
    }
  }
}
