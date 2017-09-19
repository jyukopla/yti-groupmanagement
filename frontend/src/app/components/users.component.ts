import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from "rxjs/Observable";
import { UserModel } from '../apina';

@Component({
  selector: 'app-users',
  template: `  
          <div class="col-md-12">
            <h2 translate>User list</h2>                       
            <ul>
              <li *ngFor="let user of allUsers">
              {{user.print()}}
                <pre>{{user | json}}</pre>
              </li>
            </ul>        
          </div>       
`,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {  
  allUsers: User[];

  constructor(private userService: UserService) { } 

  ngOnInit() {
    this.userService.getUsers().subscribe(userModels => {
      this.allUsers = userModels.map(userModel => new User(userModel));
    });
  }
}

class User {
  
    constructor(private userModel: UserModel) { }
  
    print() {
      return `- = ${this.userModel.name} ${this.userModel.email} Admin: ${this.userModel.superuser ? 'Yes' : 'No'} = -`;
    }
  }
