import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {UserRequestModel, UserRequestWithOrganization} from '../apina';

@Component({
  selector: 'app-user-requests',
  template: `
    <div class="container">
      <div class="row">
        <br>
        <div id="accessrequests">
          <h2 translate>Access requests</h2>
          <p *ngIf="userRequests.length === 0" translate>No requests</p>          
          <table *ngIf="userRequests.length > 0">
            <thead>
            <tr>
              <th translate>Name</th>
              <th translate>Email</th>
              <th translate>Organization</th>
              <th translate>Role</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let requests of userRequests">
              <td style="white-space: nowrap">{{requests.fullName}}</td>
              <td>{{requests.email}}</td>
              <td>{{requests.organizationName | translateValue }}</td>
              <td>{{requests.role | translate}}</td>
              <div class="col-md-4">
                <td><i class="fa fa-trash fa-lg" (click)="declineRequest(requests)"></i></td>
                <td>
                  <button id="acceptrequest"
                          type="button"
                          class="btn btn-default btn-sm"
                          (click)="acceptRequest(requests)" translate>Add
                  </button>
                </td>
              </div>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent {

  userRequests: UserRequestWithOrganization[] = [];

  constructor(private apiService: ApiService) {

    this.apiService.getAllUserRequests().subscribe( requests => {
      this.userRequests = requests;
    });
  }

  declineRequest(userRequest: UserRequestWithOrganization) {
    this.apiService.declineRequest(userRequest.id).subscribe(() => {
      this.userRequests.splice(this.userRequests.indexOf(userRequest), 1);
    });
  }

  acceptRequest(userRequest: UserRequestWithOrganization) {
    this.apiService.acceptRequest(userRequest.id).subscribe(() => {
      this.userRequests.splice(this.userRequests.indexOf(userRequest), 1);
    });
    // Add notification for new user in organization
  }
}
