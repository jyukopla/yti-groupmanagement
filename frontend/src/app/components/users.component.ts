import { Component, OnInit } from '@angular/core';
import { User} from '../entities/user';
import { Dictionary, OrganizationListItem, UserOrganization } from '../apina';
import { LocationService } from '../services/location.service';
import { ApiService } from '../services/api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-users',
  template: `
    <h2 id="mainlabel" translate>Users</h2>
    <div class="section" id="userlist">
      <div class="row">
        <div class="col-md-3">
          <input #searchInput id="usersearch" type="text" class="form-control"
                 placeholder="{{'Search user...' | translate}}"
                 [(ngModel)]="search"/>
        </div>
        <div class="col-md-3">
          <label id="filterlabel" translate>Filter: </label>
        </div>
        <div class="col-md-3">
          <select [(ngModel)]="selectedOrganization" (ngModelChange)="onOrganizationSelect(selectedOrganization)">
            <option *ngFor="let organization of organizations" [value]="organization.name">
              {{ organization.name | translateValue }}
            </option>
          </select>
          <i class="fa fa-close" (click)="selectedOrganization=undefined; this.updateUsers()"></i>
        </div>
        <div class="col-md-3">
          <select [(ngModel)]="selectedRole" (ngModelChange)="onRoleSelect(selectedRole)">
            <option *ngFor="let role of rolesFilter" [ngValue]="role">
              {{ role | translate}}
            </option>
          </select>
          <i class="fa fa-close" (click)="selectedRole=undefined; this.updateUsers()"></i>
        </div>
      </div>
    </div>
    <div class="section" id="userssection" width="75%" *ngFor="let userOrg of searchResults$ | async  ">
      <div class="row" id="organizationrow">
        <div class="col-md-3">
          <span [hidden]="isHiddenEmail(userOrg.userEmail)">{{ userOrg.lastname }}, {{ userOrg.firstname }}</span>
        </div>
        <div class="col-md-3">
          <span [hidden]="hideEmail"> {{ userOrg.userEmail }}</span>
        </div>
        <div class="col-md-3">
          <p id="divorg" [routerLink]="['/organization', userOrg.organizationId]" [hidden]="isHiddenOrg(userOrg.organizationId)">
            {{ userOrg.organizationName | translateValue
            }}</p>
        </div>
        <div class="col-md-3">
          {{ userOrg.userRole | translate }}
        </div>
      </div>
      <hr>
    </div>
    <br>
  `,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers: User[];
  roles: string[];
  rolesFilter: string[];
  selectedRole: string;
  selectedOrganization: Dictionary<string>;
  organizations: OrganizationListItem[];
  previousEmail: string;
  previousOrgId: string;
  hideEmail = false;
  search$ = new BehaviorSubject('');
  searchResults$: Observable<UserOrganization[]>;


  constructor(private apiService: ApiService,
              private locationService: LocationService,
              private languageService: LanguageService) {

    locationService.atUsers();

    this.apiService.getUsers().subscribe(users => {
      this.allUsers = users;
    });

    this.apiService.getAllRoles().subscribe(roles => {
      this.rolesFilter = roles;
    });

    this.apiService.getOrganizationList().subscribe(organizations => {
      this.organizations = organizations;
    });
  }

  ngOnInit() {
    this.updateUsers();
  }

  updateUsers() {
    this.searchResults$ =
      Observable.combineLatest(this.search$, this.apiService.getUserOrganizations()).map(([search, userOrgs]) => {
        if (this.selectedOrganization === undefined && this.selectedRole === undefined) {
          return userOrgs.filter(userOrg => userOrg.userEmail.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        } else {
          return userOrgs.filter(userOrg => {
            const emailCond = userOrg.userEmail.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            const nameCond = userOrg.userName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            const roleCond = userOrg.userRole.indexOf(this.selectedRole) !== -1;
            const translatedOrg = this.languageService.translate(userOrg.organizationName);
            const orgCond = translatedOrg !== this.languageService.translate(this.selectedOrganization);
            return emailCond && roleCond && orgCond && nameCond;
          });
        }
      });
  }

  isHiddenEmail(email: string) {
    if (email !== this.previousEmail) {
      this.previousEmail = email;
      this.hideEmail = false;
      this.previousOrgId = '';
      return false;
    } else {
      this.hideEmail = true;
      return true;
    }

  }

  isHiddenOrg(orgId: string) {
    if (orgId !== this.previousOrgId) {
      this.previousOrgId = orgId;
      return false;
    }
    return true;
  }

  get search() {
    this.previousEmail = '';
    this.previousOrgId = '';
    return this.search$.getValue();
  }

  set search(value: string) {
    this.search$.next(value);
  }

  onRoleSelect(selectedRole: string) {
    this.updateUsers();
  }

  onOrganizationSelect(selectedOrg: Dictionary<string>) {
    this.updateUsers();
  }
}
