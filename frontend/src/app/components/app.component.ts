import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <ng-template ngbModalContainer></ng-template>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(languageService: LanguageService /* XXX: injected only to invoke construction logic */) {
  }
}
