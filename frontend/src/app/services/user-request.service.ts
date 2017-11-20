import { Injectable } from '@angular/core';
import {UserRequest, UserRequestEndpoint, UserRequestWithOrganization, UUID} from '../apina';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserRequestService {

  constructor(private endpoint: UserRequestEndpoint) { }

  getUserRequests(organizationId: UUID): Observable<UserRequest[]> {
    return this.endpoint.getUserRequests(organizationId);
  }

  getAllUserRequests(): Observable<UserRequestWithOrganization[]> {
    return this.endpoint.getAllUserRequests();
  }

  deleteRequest(id: number): Observable<void> {
    return this.endpoint.deleteUserRequest(id);
  }
}
