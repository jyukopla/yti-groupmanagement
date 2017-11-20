import { Component } from '@angular/core';
import { User } from '../entities/user';
import { OrganizationListItem, UserOrganization } from '../apina';
import { LocationService } from '../services/location.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  template: `  
          <!--div class="col-md-12"-->
            <h2 id="mainlabel" translate>Users</h2>
            <div class="section" id="userlist">
              <div class="row">
                <div class="col-md-4">
              <label id="filterlabel" translate>Filter: </label>
              <select [(ngModel)]="selectedRole" (ngModelChange)="onRoleSelect(selectedRole)">
                <option *ngFor="let role of rolesFilter" [ngValue]="role">
                  {{ role | translate}}
                </option>
                        
              </select>
                </div>
                <div class="col-md-4">
              <select [(ngModel)]="selectedOrganization" (ngModelChange)="onOrganizationSelect(selectedOrganization)">
                <option *ngFor="let organization of organizations" [value]="organization.name">
                  {{ organization.name | translateValue }}
                </option>
              </select>
                </div>
              </div>
            </div>
            <div class="section" id="userssection" width="75%" *ngFor="let userOrg of userOrganizations; let i = index;  ">
              <!--table width="75%" id="userstable" *ngFor="let userOrg of userOrganizations">
                <td width="25%">{{ userOrg.lastname }}, {{ userOrg.firstname }}</td>
                <td width="25%">{{ userOrg.role | translate }}</td>
                <td id="orgtd" width="25%" [routerLink]="['/organization', userOrg.id]">{{ userOrg.organizationName | translateValue}}</td>
              </table-->
              <div class="row" id="organizationrow" >
              <div class="col-md-3">
                {{ userOrg.lastname }}, {{ userOrg.firstname }}
              </div>
                <div class="col-md-3">
                  {{ userOrg.userEmail }}
                </div>
              <div class="col-md-3">
                {{ userOrg.role | translate }}
              </div>
              <div class="col-md-3">
                <p [routerLink]="['/organization', userOrg.id]"> {{ userOrg.organizationName | translateValue }}</p>
              </div>
              </div>
            </div>
          <!--/div-->       
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
  previousUO: UserOrganization;
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
