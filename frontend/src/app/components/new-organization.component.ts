import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { SearchUserModalService } from './search-user-modal.component';
import { ignoreModalClose } from 'yti-common-ui/utils/modal';
import { User } from '../entities/user';
import { OrganizationDetails } from '../entities/organization-details';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-new-organization',
  template: `
    <div class="content-box">
      
      <app-back-button (back)="back()"></app-back-button>

      <div class="clearfix">
        <h1 class="pull-left" translate>New organization</h1>

        <button type="submit"
                class="btn btn-action pull-right"
                [disabled]="organizationAdminUsers.length === 0"
                (click)="saveOrganization()" translate>Save</button>
      </div>

      <app-organization-details [organization]="organization" ></app-organization-details>

      <h3 class="mt-4" translate>Admin users</h3>

      <p *ngIf="organizationAdminUsers.length === 0" translate>No admin users yet</p>
      <ul *ngIf="organizationAdminUsers.length > 0">
        <li *ngFor="let user of organizationAdminUsers">{{user.name}}</li>
      </ul>

      <button type="button"
              class="btn btn-action"
              (click)="addUser()" translate>Add user</button>
    </div>
  `,
  styleUrls: ['./new-organization.component.scss']
})
export class NewOrganizationComponent {

  organization = OrganizationDetails.empty();
  organizationAdminUsers: User[] = [];

  constructor(locationService: LocationService,
              private searchModal: SearchUserModalService,
              private apiService: ApiService,
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
    this.apiService.createOrganization(this.organization, this.organizationAdminEmails).subscribe(id => {
      this.router.navigate(['/organization', id]);
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
