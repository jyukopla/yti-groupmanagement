import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <ng-template ngbModalContainer></ng-template>
    <app-navigation-bar></app-navigation-bar>
    <app-breadcrumb></app-breadcrumb>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {

  constructor(languageService: LanguageService /* XXX: injected only to invoke construction logic */) {
  }
}
