import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import {OrganizationService} from "../services/organization.service";
import {OrganizationListItem, UserOrganization} from "../apina";
import {LocationService} from "../services/location.service";
import {UserOrganizationService} from "../services/userorganization.service";
import {stringDistance} from "codelyzer/util/utils";

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
export class UsersComponent implements OnInit {

  allUsers: User[];
  //rolesFilter: UserViewModel[];
  roles: string[];
  rolesFilter: string[];
  selectedRole: string;
  selectedOrganization: string;
  organizationsFilter: string[];
  organizations: OrganizationListItem[];
  userOrganizations : UserOrganization[];
  previousUO: UserOrganization;


  constructor(private userService: UserService,
              private organizationService: OrganizationService,
              private userOrganizationService: UserOrganizationService,
              private locationService: LocationService) {

    locationService.atUsers();


    this.userOrganizationService.getUserOrganizations().subscribe( uos => {
      this.userOrganizations = uos;
    });

    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    });

    this.userOrganizationService.getAllRoles().subscribe( roles => {
      this.rolesFilter = roles;
    });

    this.organizationService.getOrganizationList().subscribe( organizations => {
      this.organizations = organizations;
    });
  }



  ngOnInit() {
  }

  onRoleSelect(selectedRole: string) {

  }

  onOrganizationSelect(selectedOrganization: string) {

  }
}


class UserViewModel {

  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  organizations: string[];

  constructor(/*public user: User, public roles: string[]*/) {
  }

}
