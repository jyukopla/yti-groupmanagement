import { Component } from '@angular/core';
import { User } from '../entities/user';
import { OrganizationListItem, UserOrganization } from '../apina';
import { LocationService } from '../services/location.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  template: `
    <div class="col-md-12">
      <h2 id="mainlabel" translate>Users</h2>
      <div class="section" id="filters">
        <label id="filterlabel" translate>Filter: </label>
        <select [(ngModel)]="selectedRole" (ngModelChange)="onRoleSelect(selectedRole)">
          <option *ngFor="let role of rolesFilter" [ngValue]="role">
            {{ role | translate}}
          </option>

        </select>
        <select [(ngModel)]="selectedOrganization" (ngModelChange)="onOrganizationSelect(selectedOrganization)">
          <option *ngFor="let organization of organizations" [value]="organization.name">
            {{ organization.name | translateValue }}
          </option>
        </select>
      </div>
      <div class="section" id="userssection" width="75%">
        <table width="75%" id="userstable" *ngFor="let userOrg of userOrganizations">
          <td width="25%">{{ userOrg.userName }}</td>
          <td width="25%">{{ userOrg.userRole | translate }}</td>
          <td id="orgtd" width="25%" [routerLink]="['/organization', userOrg.organizationId]">
            {{ userOrg.organizationName | translateValue}}
          </td>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  allUsers: User[];
  roles: string[];
  rolesFilter: string[];
  selectedRole: string;
  selectedOrganization: string;
  organizationsFilter: string[];
  organizations: OrganizationListItem[];
  userOrganizations: UserOrganization[];


  constructor(private apiService: ApiService,
              private locationService: LocationService) {

    locationService.atUsers();


    this.apiService.getUserOrganizations().subscribe( uos => {
      this.userOrganizations = uos;
    });

    this.apiService.getUsers().subscribe(users => {
      this.allUsers = users;
    });

    this.apiService.getAllRoles().subscribe( roles => {
      this.rolesFilter = roles;
    });

    this.apiService.getOrganizationList().subscribe( organizations => {
      this.organizations = organizations;
    });
  }

  onRoleSelect(selectedRole: string) {

  }

  onOrganizationSelect(selectedOrganization: string) {

  }
}
