import { Component } from '@angular/core';
import { Language, LanguageService } from '../services/language.service';
import { UserService } from 'yti-common-ui/services/user.service';
import { LoginModalService } from 'yti-common-ui/components/login-modal.component';

@Component({
  selector: 'app-navigation-bar',
  styleUrls: ['./navigation-bar.component.scss'],
  template: `
    <nav class="navbar navbar-expand-md navbar-light">

      <div class="navbar-header">
        <div class="navbar-fluid logo">
          <a id="groupmanagement_home_link" class="navbar-brand" [routerLink]="['/']">
            <div class="logocontainer">
              <span>
                <svg id="flagimage" class="applogo">
                  <g>
                    <path fill="#003479" d="M53,0H2C0.9,0,0,0.9,0,2v51c0,1.1,0.9,2,2,2h51c1.1,0,2-0.9,2-2V2C55,0.9,54.1,0,53,0z"></path>
                    <g>
                      <path fill="#FFFFFF" d="M14,20v-5c0-1.1,0.9-2,2-2h5v7"></path>
                      <path fill="#FFFFFF" d="M14,27h7v14c0,0.5-0.4,1-1,1h-5c-0.6,0-1-0.5-1-1"></path>
                      <path fill="#FFFFFF" d="M28,13h13c0.5,0,1,0.4,1,1v6H28"></path>
                      <path fill="#FFFFFF" d="M41,34H28v-7h14v6C42,33.6,41.6,34,41,34z"></path>
                    </g>
                  </g>
                </svg>
              </span>
              <span class="apptitle" translate>Interoperability platform's user right management</span>
            </div>
          </a>
        </div>
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
