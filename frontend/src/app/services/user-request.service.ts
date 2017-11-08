import { Injectable } from '@angular/core';
import {UserRequest, UserRequestEndpoint, UUID} from '../apina';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserRequestService {

  constructor(private endpoint: UserRequestEndpoint) { }

  getUserRequests(organizationId: UUID): Observable<UserRequest[]> {
    return this.endpoint.getUserRequests(organizationId);
  }

  deleteUserRequest(requestId: number): void {
    this.endpoint.deleteUserRequest(requestId);
  }
}
