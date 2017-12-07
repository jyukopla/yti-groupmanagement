import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserRequestWithOrganization } from '../apina';
import { remove } from 'yti-common-ui/utils/array';

@Component({
  selector: 'app-user-requests',
  template: `
    <div *ngIf="userRequests.length > 0">

      <h2 translate>Access requests</h2>

      <table class="table table-striped">
        <tbody>
        <tr *ngFor="let request of userRequests">
          <td >{{request.fullName}}</td>
          <td>{{request.email}}</td>
          <td>{{request.organizationName | translateValue }}</td>
          <td>{{request.role | translate}}</td>
          <td class="actions">

            <button type="button"
                    class="btn btn-link"
                    (click)="declineRequest(request)">
              <i class="fa fa-trash"></i>
              <span translate>Decline</span>
            </button>

            <button type="button"
                    class="btn btn-action"
                    (click)="acceptRequest(request)" translate>Accept</button>
          </td>
        </tr>
        </tbody>
      </table>

      <hr />
      
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
    this.apiService.declineRequest(userRequest.id).subscribe(() =>
      remove(this.userRequests, userRequest));
  }

  acceptRequest(userRequest: UserRequestWithOrganization) {
    this.apiService.acceptRequest(userRequest.id).subscribe(() =>
      remove(this.userRequests, userRequest));
  }
}
