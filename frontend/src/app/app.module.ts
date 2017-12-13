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
import { FrontpageComponent } from './components/frontpage.component';
import { LanguageService } from './services/language.service';
import { NavigationBarComponent } from './components/navigation-bar.component';
import { TranslateValuePipe } from './pipes/translate-value.pipe';
import { LocationService } from './services/location.service';
import { UsersComponent } from './components/users.component';
import { OrganizationsComponent } from './components/organizations.component';
import { OrganizationDetailsComponent } from './components/organization-details.component';
import { NewOrganizationComponent } from './components/new-organization.component';
import { SearchUserModalComponent, SearchUserModalService } from './components/search-user-modal.component';
import { EditOrganizationComponent } from './components/edit-organization.component';
import { AuthorizationManager } from './services/authorization-manager.service';
import { UserRequestsComponent } from './components/user-requests.component';
import { ApiService } from './services/api.service';
import { YtiCommonModule, AUTHENTICATED_USER_ENDPOINT, LOCALIZER } from 'yti-common-ui';
import { UserDetailsComponent } from './components/user-details.component';
import {
  DeleteConfirmationModalComponent,
  DeleteConfirmationModalService
} from './components/delete-confirmation-modal.component'

const localizations: { [lang: string]: string} = {
  fi: Object.assign({},
    require('json-loader!po-loader?format=mf!../../po/fi.po'),
    require('json-loader!po-loader?format=mf!yti-common-ui/po/fi.po')
  )
  ,
  en: Object.assign({},
    require('json-loader!po-loader?format=mf!../../po/en.po'),
    require('json-loader!po-loader?format=mf!yti-common-ui/po/en.po')
  )
};

export function resolveAuthenticatedUserEndpoint() {
  return '/api/authenticated-user';
}

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
  { path: 'organization/:id', component: EditOrganizationComponent},
  { path: 'userDetails', component: UserDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    NavigationBarComponent,
    TranslateValuePipe,
    UsersComponent,
    OrganizationsComponent,
    NewOrganizationComponent,
    EditOrganizationComponent,
    SearchUserModalComponent,
    OrganizationDetailsComponent,
    UserRequestsComponent,
    UserDetailsComponent,
    DeleteConfirmationModalComponent
  ],
  entryComponents: [
    SearchUserModalComponent,
    DeleteConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    ApinaModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    TranslateModule.forRoot({ provide: TranslateLoader, useFactory: createTranslateLoader }),
    YtiCommonModule
  ],
  providers: [
    { provide: AUTHENTICATED_USER_ENDPOINT, useFactory: resolveAuthenticatedUserEndpoint },
    { provide: LOCALIZER, useExisting: LanguageService },
    { provide: MissingTranslationHandler, useFactory: createMissingTranslationHandler },
    LanguageService,
    LocationService,
    ApiService,
    AuthorizationManager,
    SearchUserModalService,
    DeleteConfirmationModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(apinaConfig: ApinaConfig) {
    apinaConfig.registerIdentitySerializer('Dictionary<string>');
  }
}
