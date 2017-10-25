import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { SearchUserModalService } from './search-user-modal.component';
import { OrganizationService } from '../services/organization.service';
import { ignoreModalClose } from '../utils/modal';
import { User } from '../entities/user';
import { OrganizationDetails } from '../entities/organizationDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-organization',
  template: `
    <div class="container">
      
      <h2 translate>New organization</h2>

      <app-organization-details [organization]="organization" ></app-organization-details>

      <h3 translate>Admin users</h3>

      <p *ngIf="organizationAdminUsers.length === 0" translate>No admin users yet</p>
      <ul *ngIf="organizationAdminUsers.length > 0">
        <li *ngFor="let user of organizationAdminUsers">{{user.name}}</li>
      </ul>

      <button type="button"
              class="btn btn-default"
              (click)="addUser()" translate>Add user</button>
      
      <button type="submit"
              class="btn btn-success"
              (click)="saveOrganization()" translate>Save</button>
    </div>
  `,
  styleUrls: ['./new-organization.component.scss']
})
export class NewOrganizationComponent {

  organization = OrganizationDetails.empty();
  organizationAdminUsers: User[] = [];

  constructor(locationService: LocationService,
              private searchModal: SearchUserModalService,
              private organizationService: OrganizationService,
              private router: Router) {

    locationService.atAddNewOrganization();
  }

  get organizationAdminEmails(): string[] {
    return this.organizationAdminUsers.map(user => user.email);
  }

  addUser() {
    this.searchModal.open(this.organizationAdminEmails)
      .then(user => this.organizationAdminUsers.push(user), ignoreModalClose);
  }

  saveOrganization() {
    this.organizationService.createOrganization(this.organization, this.organizationAdminEmails).subscribe(id => {
      this.router.navigate(['/organization', id]);
    });
  }
}
