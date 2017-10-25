import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { SearchUserModalService } from './search-user-modal.component';
import { OrganizationModel } from '../apina';
import { OrganizationService } from '../services/organization.service';
import { ignoreModalClose } from '../utils/modal';
import { User } from '../entities/user';

@Component({
  selector: 'app-new-organization',
  template: `
    <div class="container">
      
      <h2 translate>New organization</h2>

      <div class="row">
        <div class="col-md-4">
          
          <h4 translate>In finnish</h4>
          
          <div class="form-group section">
            <label for="name_fi" translate>Name</label>
            <input type="text" class="form-control" id="name_fi" [(ngModel)]="name_fi" required>
            <label for="name_fi" translate>Description</label>
            <textarea id="description_fi" class="form-control" rows="4" [(ngModel)]="description_fi"></textarea>
          </div>
        </div>

        <div class="col-md-4">

          <h4 translate>In english</h4>
          
          <div class="form-group section">
            <label for="name_en" translate>Name</label>
            <input type="text" class="form-control" id="name_en" [(ngModel)]="name_en" required>
            <label for="name_en" translate>Description</label>
            <textarea id="description_en" class="form-control" rows="4" [(ngModel)]="description_en"></textarea>
          </div>
        </div>

        <div class="col-md-4">

          <h4 translate>In swedish</h4>
          
          <div class="form-group section">
            <label for="name_sv" translate>Name</label>
            <input type="text" class="form-control" id="name_sv" [(ngModel)]="name_sv" required>
            <label for="name_sv" translate>Description</label>
            <textarea id="description_sv" class="form-control" rows="4" [(ngModel)]="description_sv"></textarea>
          </div>
        </div>
      </div>

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
    </div>`,
  styleUrls: ['./new-organization.component.scss']
})
export class NewOrganizationComponent {

  name_fi = '';
  name_en = '';
  name_sv = '';

  description_fi = '';
  description_en = '';
  description_sv = '';

  organizationAdminUsers: User[] = [];

  constructor(locationService: LocationService,
              private searchModal: SearchUserModalService,
              private organizationService: OrganizationService) {

    locationService.atAddNewOrganization();
  }

  addUser() {

    const excludedEmails = this.organizationAdminUsers.map(user => user.email);

    this.searchModal.open(excludedEmails).then((user) => {
      this.organizationAdminUsers.push(user);
    }, ignoreModalClose);
  }

  saveOrganization() {
    const organizationModel = new OrganizationModel();
    organizationModel.name_fi = this.name_fi;
    organizationModel.name_en = this.name_en;
    organizationModel.name_sv = this.name_sv;

    // TODO: save also organization admin users

    this.organizationService.createOrganization(organizationModel);
  }
}
