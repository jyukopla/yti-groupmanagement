import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from "rxjs/Observable";
import { UserModel } from '../apina';

@Component({
  selector: 'app-users',
  template: `  
          <div class="col-md-12">
            <h2>{{'UserList' | translate}}</h2>                        
            <ul>              
              <p *ngFor="let user of allUsers">
              - = {{user}} = -
              </p>              
           </ul>            
          </div>       
`,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  //users: Observable<UserModel[]>;
  userModels: Observable<UserModel[]>;
  allUsers: Array<String[]>;

  constructor(userService: UserService) {    
    
    this.userModels = userService.getUsers();
    this.allUsers = [];
    this.userModels.forEach(element =>{      
          element.forEach(user => {
            var superuser = "No";
            if (user.superuser)
              superuser = "Yes";

            var current = [user.name,' ' + user.email, ' Admin: ' + superuser];
            this.allUsers.push(current);           
          });
      });     

    //this.users = userService.getUsers();    
    //
    // Intentionally left blank
    //       
  }

  ngOnInit() {
  }

}
