import { Component } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { LocationService } from '../services/location.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationDetails } from '../entities/organization-details';
import { UUID, User } from '../apina';
import { ignoreModalClose } from '../utils/modal';
import { SearchUserModalService } from './search-user-modal.component';

@Component({
  selector: 'app-edit-organization',
  styleUrls: ['./edit-organization.component.scss'],
  template: `
    <div class="container" *ngIf="organization">

      <h2 translate>Edit organization</h2>

      <app-organization-details [organization]="organization" ></app-organization-details>

      <h3 translate>Users</h3>

      <p *ngIf="users.length === 0" translate>No users yet</p>
      <table *ngIf="users.length > 0">
        <thead>
        <tr>
          <th translate>Name</th>
          <th translate>Email</th>
          <th class="rotate" *ngFor="let role of availableRoles"><div><span>{{role | translate}}</span></div></th>
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
                   [disabled]="isDisabled(user, role)"
                   (click)="roleClicked(user, role)" />
          </td>
          <td><i id="deleteuser" 
                 class="fa fa-trash" 
                 (click)="removeUser(user)" 
                 *ngIf="canRemove(user)"></i></td>
        </tr>
        </tbody>
      </table>

      <div class="actions">
          <button type="button"
                  class="btn btn-default"
                  (click)="addUser()" translate>Add user</button>

          <button type="submit"
                  class="btn btn-success"
                  (click)="saveOrganization()" translate>Save</button>
      </div>
    </div>
  `
})
export class EditOrganizationComponent {

  organizationId: UUID;
  organization: OrganizationDetails;
  users: UserViewModel[];
  availableRoles: string[];
  adminUsers: UserViewModel[] = [];

  constructor(private route: ActivatedRoute,
              locationService: LocationService,
              private searchUserModal: SearchUserModalService,
              private organizationService: OrganizationService) {

    const organizationWithUsers$ = route.params.flatMap(params => {
      const organizationId = params['id'];
      return organizationService.getOrganization(organizationId);
    });

    organizationWithUsers$.subscribe(organizationWithUsers => {

      const organizationDetails = OrganizationDetails.fromOrganization(organizationWithUsers.organization);
      locationService.atOrganization(organizationDetails);
      this.organizationId = organizationWithUsers.organization.id;
      this.organization = organizationDetails;
      this.users = organizationWithUsers.users.map(user => new UserViewModel(user.user, user.roles));
      this.users.forEach(user => {if (user.roles.indexOf('ADMIN') !== -1) {
        this.adminUsers.push(new UserViewModel(user.user, user.roles));
      }});
      if (this.adminUsers.length === 0 || undefined) {
        // There always has to be at least one user, which has role admin
        this.adminUsers.push(new UserViewModel(new User(), ['ADMIN']));
      }
      this.availableRoles = organizationWithUsers.availableRoles;
    });
  }

  isDisabled(user: UserViewModel, role: string) {
    return this.adminUsers.length === 1 && role === 'ADMIN' && user.isInRole('ADMIN');
  }

  canRemove(user: UserViewModel) {
    return !(this.adminUsers.length <= 1) || (!user.isInRole('ADMIN'));
  }

  roleClicked(user: UserViewModel, role: string) {

    user.toggleRole(role);

    if (role === 'ADMIN' && !user.isInRole('ADMIN')) {
      this.removeFromAdmin(user);
    } else if (role === 'ADMIN') {
      this.addToAdmin(user);
    }
  }

  removeFromAdmin(user: UserViewModel) {

    this.adminUsers.splice(this.adminUsers.indexOf(user), 1);
  }

  addToAdmin( user: UserViewModel) {
    if ((user.roles.indexOf('ADMIN') !== -1)) {
      this.adminUsers.push(user);
    }
  }

  get organizationUserEmails() {
    return this.users.map(user => user.email);
  }

  addUser() {
    this.searchUserModal.open(this.organizationUserEmails)
      .then(user => this.users.push(new UserViewModel(user, [])), ignoreModalClose);
  }

  removeUser(user: UserViewModel) {
    this.users.splice(this.users.indexOf(user), 1);
    if (user.isInRole('ADMIN')) {
      this.adminUsers.splice(this.adminUsers.indexOf(user), 1);
    }
  }

  saveOrganization() {
    this.organizationService.updateOrganization(this.organizationId, this.organization, this.users).subscribe(() => {
      console.log('saved');
    });
  }
}

class UserViewModel {

  constructor(public user: User, public roles: string[]) {
  }

  get name() {
    return this.user.firstName +  ' ' + this.user.lastName;
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
