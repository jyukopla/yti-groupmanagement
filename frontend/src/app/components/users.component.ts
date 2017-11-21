import { Component } from '@angular/core';
import { OrganizationListItem, UserWithRolesInOrganizations, UUID } from '../apina';
import { LocationService } from '../services/location.service';
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Localizable } from '../entities/localization';
import { requireDefined } from '../utils/object';
import { index } from '../utils/array';

@Component({
  selector: 'app-users',
  template: `
    <div class="container" *ngIf="!loading">
      <h2 translate>Users</h2>

      <div class="row filters">
        <div class="col-12">

          <input #searchInput
                 type="text"
                 class="form-control filter"
                 placeholder="{{'Search user...' | translate}}"
                 [(ngModel)]="search"/>

          <select [(ngModel)]="organization" class="form-control filter">
            <option [value]="''" translate>All organizations</option>
            <option *ngFor="let o of organizations" [value]="o.id">
              {{ o.name | translateValue }}
            </option>
          </select>

          <select [(ngModel)]="role" class="form-control filter">
            <option [value]="''" translate>All roles</option>
            <option *ngFor="let r of roles" [value]="r">
              {{ r | translate}}
            </option>
          </select>
        </div>

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
    </div>
  `,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  roles: string[];
  organizations: OrganizationListItem[];

  search$ = new BehaviorSubject('');
  role$ = new BehaviorSubject<string>('');
  organization$ = new BehaviorSubject<string>('');

  users$: Observable<UserViewModel[]>;

  constructor(private apiService: ApiService,
              private locationService: LocationService) {

    locationService.atUsers();

    this.apiService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });

    this.apiService.getOrganizationList().subscribe(organizations => {
      this.organizations = organizations;

      const organizationsById = index(organizations, org => org.id);

      this.users$ = Observable.combineLatest(this.apiService.getUsers(), this.search$, this.role$, this.organization$)
        .map(([users, search, role, organization]) => {

          const roleMatches = (user: UserViewModel) =>
            !role || user.organizations.find(org => org.roles.indexOf(role) !== -1);

          const organizationMatches = (user: UserViewModel) =>
            !organization || user.organizations.find(org => org.id === organization) != null;

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
    return this.roles == null || this.organizations == null;
  }

  get role(): string {
    return this.role$.getValue();
  }

  set role(value: string) {
    this.role$.next(value);
  }

  get organization(): string {
    return this.organization$.getValue();
  }

  set organization(value: string) {
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
