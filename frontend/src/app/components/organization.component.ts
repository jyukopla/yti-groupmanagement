import { Component, ViewChild } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationDetails } from '../entities/organization-details';
import { UUID, User } from '../apina';
import { ignoreModalClose } from 'yti-common-ui/utils/modal';
import { SearchUserModalService } from './search-user-modal.component';
import { ApiService } from '../services/api.service';
import { DeleteConfirmationModalService } from './delete-confirmation-modal.component';
import { NotificationDirective } from 'yti-common-ui/components/notification.component';
import { TranslateService } from 'ng2-translate';
import {AuthorizationManager} from "../services/authorization-manager.service";

@Component({
  selector: 'app-organization',
  styleUrls: ['./organization.component.scss'],
  template: `
    <div class="content-box" *ngIf="organization">

      <app-back-button (back)="back()"></app-back-button>

      <div class="clearfix">
        <h1 class="pull-left" translate>Organization</h1>

        <button class="btn btn-action pull-right" (click)="editOrganization()"
                *ngIf="canEditOrganization()">
          <span translate>Edit organization</span>
        </button>
      </div>

      <app-organization-details [organization]="organization"
                                (onDataChanged)="detailsChanged()"></app-organization-details>

      <h3 translate>Users</h3>

      <p *ngIf="users.length === 0" translate>No users yet</p>
      <table *ngIf="users.length > 0">
        <thead>
        <tr>
          <th translate>Name</th>
          <th translate>Email</th>
          <th class="rotate" *ngFor="let role of availableRoles">
            <div><span>{{role | translate}}</span></div>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let user of users">
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td *ngFor="let role of availableRoles" class="check">
            <input type="checkbox"
                   [checked]="user.isInRole(role)"
                   [disabled]="true"
                   (click)="user.toggleRole(role) ; detailsChanged()"/>
          </td>
          <td>
            <button class="btn btn-link btn-sm"
                    (click)="removeUser(user)"
                    *ngIf="canRemove(user)" disabled>
              <span class="fa fa-trash"></span>
              <span translate>Remove</span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      
    </div>
  `
})
export class OrganizationComponent {

  @ViewChild('notification') notification: NotificationDirective;

  organizationId: UUID;
  organization: OrganizationDetails;
  users: UserViewModel[];
  availableRoles: string[];
  public hasDetailsChanged = false;

  constructor(private route: ActivatedRoute,
              locationService: LocationService,
              private searchUserModal: SearchUserModalService,
              private deleteUserModal: DeleteConfirmationModalService,
              private apiService: ApiService,
              private router: Router,
              private translateService: TranslateService,
              private authorizationManager: AuthorizationManager) {

    const organizationWithUsers$ = route.params.flatMap(params => {
      const organizationId = params['id'];
      return apiService.getOrganization(organizationId);
    });

    organizationWithUsers$.subscribe(organizationWithUsers => {

      const organizationDetails = OrganizationDetails.fromOrganization(organizationWithUsers.organization);
      locationService.atOrganization(organizationDetails);
      this.organizationId = organizationWithUsers.organization.id;
      this.organization = organizationDetails;
      this.users = organizationWithUsers.users.map(user => new UserViewModel(user.user, user.roles));
      this.availableRoles = organizationWithUsers.availableRoles;
    });
  }

  get adminUserCount() {
    return this.users.filter(user => user.isInRole('ADMIN')).length;
  }

  isRoleDisabledForUser(user: UserViewModel, role: string) {
    return role === 'ADMIN' && this.isUserLastAdmin(user);
  }

  isUserLastAdmin(user: UserViewModel) {
    return this.adminUserCount === 1 && user.isInRole('ADMIN');
  }

  canRemove(user: UserViewModel) {
    return !this.isUserLastAdmin(user);
  }

  get organizationUserEmails() {
    return this.users.map(user => user.email);
  }

  addUser() {
    this.searchUserModal.open(this.organizationUserEmails)
      .then(user => {
        this.users.push(new UserViewModel(user, []));
        this.hasDetailsChanged = true;
      }, ignoreModalClose);
  }

  removeUser(user: UserViewModel) {
    this.deleteUserModal.open(user.name, user.email)
      .then(() => this.users.splice(this.users.indexOf(user), 1)).catch(ignoreModalClose);
    this.hasDetailsChanged = true;
  }

  saveOrganization() {
    this.apiService.updateOrganization(this.organizationId, this.organization, this.users).subscribe({
      next: () => this.notification.showSuccess(this.translateService.instant('Changes saved'), 3000, 'left'),
      error: () => this.notification.showFailure(this.translateService.instant('Save failed'), 3000, 'left')
    });

    this.hasDetailsChanged = false;
  }

  back() {
    this.router.navigate(['/']);
  }

  detailsChanged() {
    this.hasDetailsChanged = true;
  }

  canEditOrganization(): boolean {
    return this.authorizationManager.canEditOrganization(this.organizationId);
  }

  editOrganization() {
    this.router.navigate(['/editOrganization', this.organizationId]);
  }
}

class UserViewModel {

  constructor(public user: User, public roles: string[]) {
  }

  get name() {
    return this.user.firstName + ' ' + this.user.lastName;
  }

  get email() {
    return this.user.email;
  }

  isInRole(role: string) {
    return this.roles.indexOf(role) !== -1;
  }

  toggleRole(role: string) {
    if (this.isInRole(role)) {
      this.removeRole(role);
    } else {
      this.addRole(role);
    }
  }

  private removeRole(role: string) {
    this.roles.splice(this.roles.indexOf(role), 1);
  }

  private addRole(role: string) {
    this.roles.push(role);
  }
}
