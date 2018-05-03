import { Component } from '@angular/core';
import { Role, UserService } from 'yti-common-ui/services/user.service';
import { Router } from '@angular/router';
import { index } from 'yti-common-ui/utils/array';
import { comparingLocalizable } from 'yti-common-ui/utils/comparator';
import { ApiService } from '../services/api.service';
import { OrganizationListItem } from '../apina';
import { LanguageService } from '../services/language.service';
import { LocationService } from '../services/location.service';

interface UserOrganizationRoles {
  organization?: OrganizationListItem;
  roles: Role[];
}

@Component({
  selector: 'app-user-details',
  template: `
    <div class="content-box" *ngIf="!loading">

      <app-back-button id="back_button" (back)="back()"></app-back-button>
      
      <div class="page-header">
        <h1 translate>User details</h1>
      </div>

      <div class="form-group">
        <label translate>Name</label>
        <p class="form-control-static">{{user.name}}</p>
      </div>

      <div class="form-group">
        <label translate>Email</label>
        <p class="form-control-static">{{user.email}}</p>
      </div>

      <div class="form-group">
        <label translate>Organizations and roles</label>
        <div class="form-control-static">
          <div *ngFor="let userOrganization of userOrganizations">
            <div *ngIf="userOrganization.organization">{{userOrganization.organization.name | translateValue}}</div>
            <div *ngIf="!userOrganization.organization" translate>Unknown organization</div>
            <ul>
              <li *ngFor="let role of userOrganization.roles">{{role | translate}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDetailsComponent {

  allOrganizationsById: Map<string, OrganizationListItem>;

  constructor(private router: Router,
              private userService: UserService,
              private apiService: ApiService,
              private languageService: LanguageService,
              locationService: LocationService) {

    locationService.atUserDetails();

    apiService.getOrganizationList().subscribe(organizations => {
      this.allOrganizationsById = index(organizations, org => org.id as string);
    });
  }

  get user() {
    return this.userService.user;
  }

  get loading() {
    return !this.allOrganizationsById;
  }

  get userOrganizations(): UserOrganizationRoles[] {

    const result = Array.from(this.user.rolesInOrganizations.entries()).map(([organizationId, roles]) => {
      return {
        organization: this.allOrganizationsById.get(organizationId),
        roles: Array.from(roles)
      };
    });

    result.sort(comparingLocalizable<UserOrganizationRoles>(this.languageService, org => org.organization ? org.organization.name : {}));

    return result;
  }

  back() {
    this.router.navigate(['/']);
  }
}
