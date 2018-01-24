import {Component, OnDestroy, ViewChild} from '@angular/core';
import { LocationService } from '../services/location.service';
import { SearchUserModalService } from './search-user-modal.component';
import { ignoreModalClose } from 'yti-common-ui/utils/modal';
import { User } from '../entities/user';
import { OrganizationDetails } from '../entities/organization-details';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationDirective } from 'yti-common-ui/components/notification.component';
import { TranslateService } from 'ng2-translate';
import { OrganizationDetailsComponent } from './organization-details.component';

@Component({
  selector: 'app-new-organization',
  template: `
    <div class="content-box">

      <app-back-button (back)="back()"></app-back-button>

      <div class="clearfix">
        <h1 class="pull-left" translate>New organization</h1>        
        <button type="button"
                [disabled]="!isValid()"
                class="btn btn-action pull-right"
                appNotification
                #notification="notification"
                (click)="saveOrganization()"
                translate>Save
        </button>

        <button type="submit"
                class="btn btn-link cancel pull-right"
                (click)="back()" translate>Cancel
        </button>
      </div>

      <app-organization-details #details="details"
                                [organization]="organization" 
                                [editing]="true"></app-organization-details>

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
export class NewOrganizationComponent implements OnDestroy{

  organization = OrganizationDetails.empty();
  organizationAdminUsers: User[] = [];
  successfullySaved = false;
  isModalOpen = false;

  @ViewChild('notification') notification: NotificationDirective;
  @ViewChild('details') details: OrganizationDetailsComponent;

  constructor(locationService: LocationService,
              private searchModal: SearchUserModalService,
              private apiService: ApiService,
              private router: Router,
              private translateService: TranslateService) {

    locationService.atAddNewOrganization();
  }

  get organizationAdminEmails(): string[] {
    return this.organizationAdminUsers.map(user => user.email);
  }

  isValid() {
    return this.details.isValid() && this.organizationAdminUsers.length > 0;
  }

  hasChanges() {
    return !this.successfullySaved && (this.details.hasChanges() || this.organizationAdminUsers.length > 0 || this.isModalOpen);
  }

  addUser() {
    this.isModalOpen = true;
    this.searchModal.open(this.organizationAdminEmails)
      .then(user => this.organizationAdminUsers.push(user), ignoreModalClose).then(() => this.isModalOpen=false);
  }

  saveOrganization() {
      this.apiService.createOrganization(this.organization, this.organizationAdminEmails).subscribe( {
        next: id => {
          this.successfullySaved = true;
          this.router.navigate(['/organization', id]);
        },
        error: () => this.notification.showFailure(this.translateService.instant('Save failed'), 3000, 'left'),
      });
  }

  back() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.searchModal.close();
  }
}
