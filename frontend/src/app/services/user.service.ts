import { Injectable } from '@angular/core';
import { UserEndpoint, UserModel } from '../apina';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private endpoint: UserEndpoint) { }

  getUsers(): Observable<UserModel[]> {
      return this.endpoint.getUsers();
    }

  getUsersForOrganization(): UserModel[] {
    return null;//this.endpoint. getUsers();
  }

  addUser(user: UserModel): void {
    this.endpoint.setUser(user);
}
}
