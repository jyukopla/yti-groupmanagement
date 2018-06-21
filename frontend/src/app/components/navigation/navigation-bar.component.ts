import { Component } from '@angular/core';
import { Language, LanguageService } from '../../services/language.service';
import { UserService } from 'yti-common-ui/services/user.service';
import { LoginModalService } from 'yti-common-ui/components/login-modal.component';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav class="navbar navbar-expand-md navbar-light">

      <div class="navbar-header">
        <a id="main_page_link" class="navbar-brand" [routerLink]="['/']">
          <app-logo></app-logo>
          <span translate>Interoperability platform's user right management</span>
        </a>
      </div>

      <ul class="navbar-nav ml-auto">

        <li class="nav-item" *ngIf="!isLoggedIn()">
          <a class="nav-link" id="navigation_login_link" (click)="logIn()" translate>LOG IN</a>
        </li>

        <li class="nav-item logged-in" *ngIf="isLoggedIn()">
          <span>{{user.name}}</span>
          <a class="nav-link" id="navigation_logout_link" (click)="logOut()" translate>LOG OUT</a>
        </li>

        <li class="nav-item dropdown" placement="bottom-right" ngbDropdown>
          <a class="dropdown-toggle nav-link btn btn-language" id="lang_selection_dropdown" ngbDropdownToggle>{{language.toUpperCase()}}</a>
          <div ngbDropdownMenu>
            <a *ngFor="let availableLanguage of availableLanguages"
               id="{{availableLanguage.code + '_available_language'}}"
               class="dropdown-item"
               [class.active]="availableLanguage.code === language"
               (click)="language = availableLanguage.code">
              <span>{{availableLanguage.name}}</span>
            </a>
          </div>
        </li>

        <li class="nav-item dropdown" placement="bottom-right" ngbDropdown>
          <a class="nav-link btn-menu" id="app_menu_dropdown" ngbDropdownToggle>
            <app-menu></app-menu>
          </a>
          <div ngbDropdownMenu>
            <a class="dropdown-item" id="logout_link" *ngIf="isLoggedIn()" (click)="logOut()">
              <i class="fa fa-sign-out"></i>
              <span translate>LOG OUT</span>
            </a>
            <a class="dropdown-item" id="login_link" *ngIf="!isLoggedIn()" (click)="logIn()">
              <i class="fa fa-sign-in"></i>
              <span translate>LOG IN</span>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" [routerLink]="['/userDetails']" translate>User details</a>
          </div>
        </li>
      </ul>
    </nav>
  `
})
export class NavigationBarComponent {

  availableLanguages = [
    { code: 'fi' as Language, name: 'Suomeksi (FI)' },
    //{ code: 'sv' as Language, name: 'På svenska (SV)' },
    { code: 'en' as Language, name: 'In English (EN)' }
  ];

  constructor(private languageService: LanguageService,
              private userService: UserService,
              private loginModal: LoginModalService) {
  }

  set language(language: Language) {
    this.languageService.language = language;
  }

  get language(): Language {
    return this.languageService.language;
  }

  logIn() {
    this.loginModal.open();
  }

  logOut() {
    this.userService.logout();
  }

  get user() {
    return this.userService.user;
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
