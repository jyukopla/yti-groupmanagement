import {Component, OnDestroy, ViewChild} from '@angular/core';
import { LocationService } from '../services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationDetails } from '../entities/organization-details';
import { EmailRole, UUID } from '../apina';
import { ignoreModalClose } from 'yti-common-ui/utils/modal';
import { SearchUserModalService } from './search-user-modal.component';
import { ApiService } from '../services/api.service';
import { DeleteConfirmationModalService } from './delete-confirmation-modal.component';
import { NotificationDirective } from 'yti-common-ui/components/notification.component';
import { TranslateService } from 'ng2-translate';
import { AuthorizationManager } from '../services/authorization-manager.service';
import { anyMatching, remove } from 'yti-common-ui/utils/array';
import { ConfirmationModalService } from 'yti-common-ui/components/confirmation-modal.component';
import { OrganizationDetailsComponent } from './organization-details.component';

@Component({
  selector: 'app-organization',
  styleUrls: ['./organization.component.scss'],
  template: `
    <div class="content-box" *ngIf="organization">

      <app-back-button (back)="back()"></app-back-button>
      
      <div class="clearfix">
        <h1 class="pull-left" translate>Organization</h1>

        <button class="btn btn-action pull-right" (click)="startEditing()"
                *ngIf="!editing && !notificationVisible && canEditOrganization()">
          <span translate>Edit organization</span>
        </button>

        <button type="button"
                *ngIf="editing || notificationVisible"
                [disabled]="!hasChanges() || !isValid() || notificationVisible"
                appNotification
                #notification="notification"
                class="btn btn-action pull-right"
                (click)="saveOrganization()"
                translate>Save
        </button>

        <button type="submit"
                class="btn btn-link cancel pull-right"
                *ngIf="editing || notificationVisible"
                (click)="cancelEditing()" translate>Cancel
        </button>

      </div>

      <app-organization-details #details="details"
                                [organization]="organization"
                                [editing]="editing"></app-organization-details>

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
                   [disabled]="!editing || isRoleDisabledForUser(user, role)"
                   (click)="user.toggleRole(role)"/>
          </td>
          <td>
            <button class="btn btn-link btn-sm"
                    (click)="removeUser(user)"
                    *ngIf="canRemove(user)">
              <span class="fa fa-trash"></span>
              <span translate>Remove</span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div *ngIf="editing" class="actions">
        <button type="button"
                class="btn btn-action"
                (click)="addUser()" translate>Add user
        </button>
      </div>

    </div>
  `
})
export class OrganizationComponent implements OnDestroy{

  @ViewChild('notification') notification: NotificationDirective;
  @ViewChild('details') details: OrganizationDetailsComponent;

  organizationId: UUID;

  organization: OrganizationDetails;
  organizationBeforeEditing: OrganizationDetails;

  users: UserViewModel[];
  usersBeforeEditing: UserViewModel[];

  usersAddedOrRemoved = false;

  availableRoles: string[];
  editing = false;

  isModalOpen = false;

  constructor(private route: ActivatedRoute,
              locationService: LocationService,
              private searchUserModal: SearchUserModalService,
              private deleteUserModal: DeleteConfirmationModalService,
              private confirmationModalService: ConfirmationModalService,
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
      this.users = organizationWithUsers.users.map(user =>
        new UserViewModel(user.user.firstName, user.user.lastName, user.user.email, user.roles));
      this.availableRoles = organizationWithUsers.availableRoles;
    });
  }

  startEditing() {
    this.editing = true;
    this.usersBeforeEditing = this.users.map(user => user.clone());
    this.organizationBeforeEditing = this.organization.clone();
  }

  cancelEditing() {
    this.editing = false;
    this.users = this.usersBeforeEditing;
    this.organization = this.organizationBeforeEditing;
    this.setPristine();
  }

  isValid() {
    return this.details.isValid();
  }

  hasChanges() {
    return this.details.hasChanges() || this.usersAddedOrRemoved || anyMatching(this.users, user => user.rolesChanged) || this.isModalOpen;
  }

  setPristine() {

    this.details.reset();
    this.usersAddedOrRemoved = false;
    this.searchUserModal.close();
    this.isModalOpen=false;

    for (const user of this.users) {
      user.setPristine();
    }
  }

  get notificationVisible() {
    return this.notification ? this.notification.isOpen() : false;
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
    return this.editing && !this.isUserLastAdmin(user);
  }

  get organizationUserEmails() {
    return this.users.map(user => user.email);
  }

  addUser() {
    this.isModalOpen = true;
    this.searchUserModal.open(this.organizationUserEmails)
      .then(user => {
        this.users.push(new UserViewModel(user.firstName, user.lastName, user.email, []));
        this.usersAddedOrRemoved = true;
      }, ignoreModalClose).then(() => this.isModalOpen=false);
  }

  removeUser(user: UserViewModel) {
    this.deleteUserModal.open(user.name, user.email)
      .then(() => {
        remove(this.users, user);
        this.usersAddedOrRemoved = true;
      }, ignoreModalClose);
  }

  saveOrganization() {

    const userRoles: EmailRole[] = [];

    for (const user of this.users) {
      for (const role of user.roles) {
        const emailRole = new EmailRole();
        emailRole.role = role;
        emailRole.userEmail = user.email;
        userRoles.push(emailRole);
      }
    }

    this.apiService.updateOrganization(this.organizationId, this.organization, userRoles).subscribe({
      next: () => {
        this.notification.showSuccess(this.translateService.instant('Changes saved'), 3000, 'left');
        this.editing = false;
        this.setPristine();
      },
      error: () => this.notification.showFailure(this.translateService.instant('Save failed'), 3000, 'left')
    });
  }

  back() {
    this.router.navigate(['/']);
  }

  canEditOrganization(): boolean {
    return this.authorizationManager.canEditOrganization(this.organizationId);
  }

  ngOnDestroy() {
    this.searchUserModal.dismiss();
  }
}

class UserViewModel {

  rolesChanged = false;

  constructor(public firstName: string,
              public lastName: string,
              public email: string,
              public roles: string[]) {
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
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

  setPristine() {
    this.rolesChanged = false;
  }

  clone() {
    return new UserViewModel(this.firstName, this.lastName, this.email, this.roles.slice());
  }

  private removeRole(role: string) {
    this.rolesChanged = true;
    this.roles.splice(this.roles.indexOf(role), 1);
  }

  private addRole(role: string) {
    this.rolesChanged = true;
    this.roles.push(role);
  }
}
