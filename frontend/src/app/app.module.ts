import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  TranslateModule, TranslateLoader, MissingTranslationHandler,
  MissingTranslationHandlerParams
} from 'ng2-translate';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './components/app.component';
import { ApinaConfig, ApinaModule } from './apina';
import { TestService } from './services/test.service';
import { UserService } from './services/user.service';
import { OrganizationService } from './services/organization.service';
import { FrontpageComponent } from './components/frontpage.component';
import { LanguageService } from './services/language.service';
import { NavigationBarComponent } from './components/navigation-bar.component';
import { BreadcrumbComponent } from './components/breadcrumb.component';
import { FooterComponent } from './components/footer.component';
import { TranslateValuePipe } from './pipes/translate-value.pipe';
import { LocationService } from './services/location.service';
import { UsersComponent } from './components/users.component';
import { OrganizationsComponent } from './components/organizations.component';
import { OrganizationDetailsComponent } from './components/organization-details.component';
import { NewOrganizationComponent } from './components/new-organization.component';
import { SearchUserModalComponent, SearchUserModalService } from './components/search-user-modal.component';

const localizations: { [lang: string]: string} = {
  fi: require('json-loader!po-loader?format=mf!../../po/fi.po'),
  en: require('json-loader!po-loader?format=mf!../../po/en.po')
};

export function createTranslateLoader(): TranslateLoader {
  return { getTranslation: (lang: string) => Observable.of(localizations[lang]) };
}

export function createMissingTranslationHandler(): MissingTranslationHandler {
  return {
    handle: (params: MissingTranslationHandlerParams) => {
      if (params.translateService.currentLang === 'en') {
        return params.key;
      } else {
        return '[MISSING]: ' + params.key;
      }
    }
  };
}

const appRoutes: Routes = [
  { path: '', component: FrontpageComponent },
  { path: 'newOrganization', component: NewOrganizationComponent },
  { path: 'organization/:id', component: OrganizationDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    NavigationBarComponent,
    BreadcrumbComponent,
    FooterComponent,
    TranslateValuePipe,
    UsersComponent,
    OrganizationsComponent,
    NewOrganizationComponent,
    SearchUserModalComponent,
    OrganizationDetailsComponent
  ],
  imports: [
    BrowserModule,
    ApinaModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    TranslateModule.forRoot({ provide: TranslateLoader, useFactory: createTranslateLoader })
  ],
  providers: [
    { provide: MissingTranslationHandler, useFactory: createMissingTranslationHandler },
    LanguageService,
    LocationService,
    TestService,
    UserService,
    OrganizationService,
    SearchUserModalService
  ],
  entryComponents: [
    SearchUserModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(apinaConfig: ApinaConfig) {
    apinaConfig.registerIdentitySerializer('Dictionary<string>');
  }
}
