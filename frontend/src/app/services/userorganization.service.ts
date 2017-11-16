import { Injectable } from '@angular/core';
import {UserOrganization, UserOrganizationEndpoint, UserRequestWithOrganization} from '../apina';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserOrganizationService {

  constructor(private endpoint: UserOrganizationEndpoint) { }

  getUserOrganizations(): Observable<UserOrganization[]> {
    return this.endpoint.getUserOrganizations();
  }

  getAllRoles(): Observable<string[]> {
    return this.endpoint.getAllRoles();
  }

  addUserToOrganization(userRequest: UserRequestWithOrganization):  Observable<void>  {
    return this.endpoint.addUserToOrganization(userRequest);
  }
}







