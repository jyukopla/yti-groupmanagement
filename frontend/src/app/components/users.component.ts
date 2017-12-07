import { Component } from '@angular/core';
import { OrganizationListItem, UserWithRolesInOrganizations, UUID } from '../apina';
import { LocationService } from '../services/location.service';
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Localizable } from 'yti-common-ui/types/localization';
import { requireDefined } from 'yti-common-ui/utils/object';
import { index } from 'yti-common-ui/utils/array';
import { FilterOptions } from 'yti-common-ui/components/filter-dropdown.component';
import { LanguageService } from '../services/language.service';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-users',
  template: `
    <app-ajax-loading-indicator *ngIf="loading"></app-ajax-loading-indicator>

    <h1 translate>Users</h1>

    <div class="top-actions">

      <div class="input-group input-group-search pull-left">
        <input #searchInput
               type="text"
               class="form-control"
               placeholder="{{'Search user' | translate}}"
               [(ngModel)]="search" />
      </div>

      <app-filter-dropdown [options]="organizationOptions"
                           [filterSubject]="organization$"
                           class="pull-left ml-2"></app-filter-dropdown>

      <app-filter-dropdown [options]="roleOptions"
                           [filterSubject]="role$"
                           class="pull-left ml-2"></app-filter-dropdown>
    </div>

    <div class="results">
      <div class="result" *ngFor="let user of users$ | async">
        <h4>{{user.displayName}} <span class="email">({{user.email}})</span></h4>
        <ul>
          <li *ngFor="let organization of user.organizations">
            <a [routerLink]="['/organization', organization.id]">
              {{organization.name | translateValue}}
            </a>:
            <span *ngFor="let role of organization.roles; let last = last">
                <span class="role">{{role | translate}}</span><span [hidden]="last">,</span>
              </span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  roleOptions: FilterOptions<string>;
  organizationOptions: FilterOptions<OrganizationListItem>;

  search$ = new BehaviorSubject('');
  role$ = new BehaviorSubject<string|null>(null);
  organization$ = new BehaviorSubject<OrganizationListItem|null>(null);

  users$: Observable<UserViewModel[]>;

  constructor(private apiService: ApiService,
              private locationService: LocationService,
              languageService: LanguageService,
              translateService: TranslateService) {

    this.apiService.getAllRoles().subscribe(roles => {
      this.roleOptions = [null, ...roles].map(role => ({
        value: role,
        name: () => translateService.instant(role ? role : 'All roles')
      }));
    });

    this.apiService.getOrganizationList().subscribe(organizations => {

      this.organizationOptions = [null, ...organizations].map(org => ({
        value: org,
        name: () => org ? languageService.translate(org.name) : translateService.instant('All organizations')
      }));

      const organizationsById = index(organizations, org => org.id);

      this.users$ = Observable.combineLatest(this.apiService.getUsers(), this.search$, this.role$, this.organization$)
        .map(([users, search, role, organization]) => {

          const roleMatches = (user: UserViewModel) =>
            !role || user.organizations.find(org => org.roles.indexOf(role) !== -1);

          const organizationMatches = (user: UserViewModel) =>
            !organization || user.organizations.find(org => org.id === organization.id) != null;

          const searchMatchesName = (user: UserViewModel) =>
            !search || user.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1;

          const searchMatchesEmail = (user: UserViewModel) =>
            !search || user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1;

          const searchMatches = (user: UserViewModel) =>
            searchMatchesName(user) || searchMatchesEmail(user);

          return users.map(user => new UserViewModel(user, organizationsById))
            .filter(user => roleMatches(user) && organizationMatches(user) && searchMatches(user));
        });
    });
  }

  get loading() {
    return this.roleOptions == null || this.organizationOptions == null;
  }

  get role(): string|null {
    return this.role$.getValue();
  }

  set role(value: string|null) {
    this.role$.next(value);
  }

  get organization(): OrganizationListItem|null {
    return this.organization$.getValue();
  }

  set organization(value: OrganizationListItem|null) {
    this.organization$.next(value);
  }

  get search() {
    return this.search$.getValue();
  }

  set search(value: string) {
    this.search$.next(value);
  }
}

class UserViewModel {

  organizations: { id: UUID, name: Localizable, roles: string[] }[];

  constructor(private user: UserWithRolesInOrganizations, organizations: Map<UUID, OrganizationListItem>) {

    this.organizations = user.organizations.map(org => {
      return {
        id: org.id,
        name: requireDefined(organizations.get(org.id)).name,
        roles: org.roles
      };
    });
  }

  get email() {
    return this.user.email;
  }

  get displayName() {
    return this.user.lastName + ', ' + this.user.firstName;
  }
}
