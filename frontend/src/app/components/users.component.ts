import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../entities/user';

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
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }
}
