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
      <button id="demobutton"
              type="button"
              class="btn btn-default btn-sm"
              (click)="addrequest()">DEMO
      </button>
    </div>
  `,
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent {

  userRequests: UserRequestWithOrganization[] = [];

  req1 = new UserRequestModel;
  req2 = new  UserRequestModel;
  req3 = new UserRequestModel;

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

  // FOR DEMO PURPOSE
  addrequest() {



    this.req1.role = "TERMINOLOGY_EDITOR"
    this.req1.email = "jere.veijalainen@riodigital.fi";
    this.req1.organizationId = "09bf60ab-cca0-48b6-ab45-0a7f27ff9f88";

    this.req2.role = "ADMIN"
    this.req2.email = "tomi.lammi@gatewaytechnolabs.fi";
    this.req2.organizationId = "09bf60ab-cca0-48b6-ab45-0a7f27ff9f88";

    this.req3.role = "ADMIN"
    this.req3.email = "tomi.lammi@gatewaytechnolabs.fi";
    this.req3.organizationId = "2f9eab0b-d6f0-42ce-b3aa-9f3647618b4d";

    this.apiService.createRequest(this.req1).subscribe();
    this.apiService.createRequest(this.req2).subscribe();
    this.apiService.createRequest(this.req3).subscribe();
  }
}
