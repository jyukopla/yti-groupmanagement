import { Injectable } from '@angular/core';
import { UserOrganization, UserOrganizationEndpoint } from '../apina';
import { Observable } from 'rxjs/Observable';
import { User } from '../entities/user';

@Injectable()
export class UserOrganizationService {

  constructor(private endpoint: UserOrganizationEndpoint) { }

  getUserOrganizations(): Observable<UserOrganization[]> {
    return this.endpoint.getUserOrganizations();
  }

  getAllRoles(): Observable<string[]> {
    return this.endpoint.getAllRoles();
  }
}







