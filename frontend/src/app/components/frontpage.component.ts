import { Component } from '@angular/core';
import { TestService } from '../services/test.service';
//import { UserService } from '../services/user.service';
import { Observable } from "rxjs/Observable";
import { LocationService } from '../services/location.service';
import { UsersComponent } from './users.component';
//import { UserModel } from '../apina';

@Component({
  selector: 'frontpage',
  styleUrls: ['./frontpage.component.scss'],
  template: `
    <div class="container-fluid">
      <div class="page-header row">
        <div class="col-md-12 mx-auto">
          <div class="row">
            <div class="col-md-12">
              <app-users></app-users>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})

export class FrontpageComponent {
   
  constructor(locationService: LocationService) {

    locationService.atFrontPage();    
       
  }
}
