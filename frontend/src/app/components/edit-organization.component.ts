import { Component } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { LocationService } from '../services/location.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationDetails } from '../entities/organizationDetails';
import { UUID, User } from '../apina';

@Component({
  selector: 'app-edit-organization',
  template: `
    <div class="container" *ngIf="organization">

      <h2 translate>Edit organization</h2>

      <app-organization-details [organization]="organization" ></app-organization-details>

      <h3 translate>Users</h3>

      <p *ngIf="users.length === 0" translate>No users yet</p>
      <ul *ngIf="users.length > 0">
        <li *ngFor="let user of users">
          {{user.print()}}
        </li>
      </ul>

      <button type="submit"
              class="btn btn-success"
              (click)="saveOrganization()" translate>Save</button>
    </div>
  `
})
export class EditOrganizationComponent {

  organizationId: UUID;
  organization: OrganizationDetails;
  users: UserViewModel[];

  constructor(private route: ActivatedRoute,
              locationService: LocationService,
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
    });
  }

  saveOrganization() {
    this.organizationService.updateOrganization(this.organizationId, this.organization, this.users).subscribe(() => {
      console.log('saved');
    });
  }
}

// TODO figure out proper view model object, currently just for debug printing usage
class UserViewModel {

  constructor(public user: User, public roles: string[]   ) {
  }

  print() {
    return this.user.firstName +
      ' ' + this.user.lastName +
      ' (' + this.user.email + ') ' +
      'roles: ' + this.roles.join(',');
  }
}
