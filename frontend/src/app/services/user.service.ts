import { Injectable } from '@angular/core';
import { UserEndpoint, UserModel } from '../apina';
import { Observable } from 'rxjs/Observable';
import { User } from '../entities/user';

@Injectable()
export class UserService {

  constructor(private endpoint: UserEndpoint) { }

  getUsers(): Observable<User[]> {
    return this.endpoint.getUsers().map(users =>
      users.map(userModel => new User(userModel)));
  }

  getUsersForOrganization(): User[] {
    return []; // TODO: this.endpoint.getUsers();
  }

  addUser(user: UserModel): void {
    this.endpoint.setUser(user);
  }
}
