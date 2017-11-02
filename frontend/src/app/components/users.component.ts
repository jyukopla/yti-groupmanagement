import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';
import {OrganizationService} from "../services/organization.service";
import {OrganizationListItem} from "../apina";
import {LocationService} from "../services/location.service";
import {UserOrganizationService} from "../services/userorganization.service";
import {stringDistance} from "codelyzer/util/utils";

@Component({
  selector: 'app-users',
  template: `  
          <div class="col-md-12">
            <h2 translate>Users</h2>
            <div class="section" id="filters">
              <label translate>Filter: </label>
              <select [(ngModel)]="selectedRole" (ngModelChange)="onRoleSelect(selectedRole)">
                <option *ngFor="let role of rolesFilter" [ngValue]="role">
                  {{ role }}
                </option>
              </select>
              <select [(ngModel)]="selectedOrganization" (ngModelChange)="onOrganizationSelect(selectedOrganization)">
                <option *ngFor="let organization of organizations" [value]="organization.name">
                  {{ organization.name | translateValue }}
                </option>
              </select>
            </div>

            <div class="section" id="userssection">
            </div>
          </div>       
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


  constructor(private userService: UserService,
              private organizationService: OrganizationService,
              private userOrganizationService: UserOrganizationService,
              private locationService: LocationService) {

    locationService.atUsers();


    this.userOrganizationService.getUserOrganizations().subscribe( uos => {
      //TODO
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
