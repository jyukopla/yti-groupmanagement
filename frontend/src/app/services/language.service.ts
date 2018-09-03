import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Localizable, Localizer } from 'yti-common-ui/types/localization';
import { Observable, BehaviorSubject } from 'rxjs';

export type Language = string;

@Injectable()
export class LanguageService implements Localizer {

  language$ = new BehaviorSubject<Language>('fi');

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['fi', 'en']);
    translateService.setDefaultLang('en');

    this.language$.subscribe(lang => this.translateService.use(lang));
  }

  get translateLanguage$(): Observable<Language> {
    return this.language$;
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
