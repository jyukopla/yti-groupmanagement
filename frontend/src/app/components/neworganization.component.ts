import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from "../services/location.service";
import {SearchModalService} from "./search-user-modal.component";
import {OrganizationModel, UserModel} from "../apina";
import {UserService} from "../services/user.service";
import {OrganizationService} from "../services/organization.service";
import {ignoreModalClose} from "../utils/modal";

@Component({
  selector: 'app-neworganization',
  template: `<div class="container">
    <h2 translate>New organization</h2>
    <ul id="organizations">
    
      <div class="form-group">
        <div id="organization">
        <label for="name_fi" translate>Name FI</label>
        <input type="text" class="form-control" id="name_fi" [(ngModel)]="name_fi" required>
        <label for="name_fi" translate>Description FI</label>
          <textarea id="description_fi" class="form-control" rows="4" [(ngModel)]="description_fi"></textarea>
        </div>
        <div id="organization">
        <label for="name_en" translate>Name EN</label>
        <input type="text" class="form-control" id="name_en" [(ngModel)]="name_en" required>
        <label for="name_en" translate>Description EN</label>
          <textarea id="description_en" class="form-control" rows="4" [(ngModel)]="description_en"></textarea>
        </div>
        <div id="organization">
        <label for="name_sv" translate>Name SV</label>
        <input type="text" class="form-control" id="name_sv" [(ngModel)]="name_sv" required>
        <label for="name_sv" translate>Description SV</label>
          <textarea id="description_sv" class="form-control" rows="4" [(ngModel)]="description_sv"></textarea>
          <button type="submit" class="btn btn-success" (click)="saveOrganization()" translate>Save</button>
        </div>        
      </div>      

    
      </ul>
    <br>
    
    <h3 translate>Group members</h3>
    <ul id="organization_users">
      
      <p></p>
      <table style="width:100%">
        <thead>
        <tr>
          <th translate>User</th>
          <th translate>Role</th>
          <th translate>Application</th>
        </tr>
        </thead>
        <tbody>
            <tr >
              <td>{{this.organizationUser.name}}<p>{{this.organizationUser.email}}</p></td>
                <td>{{this.organizationUser.role}}</td>
            </tr>
        </tbody>
      </table>
    </ul>
    <button type="button"
            class="btn btn-default"

            (click)="addUser()" translate>Add user</button>
    
  </div>`,
  styleUrls: ['./neworganization.component.scss']
})
export class NewOrganizationComponent implements OnInit {

  @Input() self?: UserModel;
  @Input() reference: UserModel;

  name_fi = "";
  name_en = "";
  name_sv = "";
  description_fi ="";
  description_en ="";
  description_sv ="";

  //userService: UserService;
  //organizationService: OrganizationService;
  selectedMember: Promise<OrganizationModel>;
  selectedResult = {};

  userModel = new UserModel;
  organizationUser: OrganizationUser;
  organizationModel: OrganizationModel;


  constructor(locationService: LocationService,
              private searchModal: SearchModalService,
              public organizationService: OrganizationService) {

    locationService.atAddNewOrganization();
  }

  ngOnInit() {
    this.organizationUser = new OrganizationUser();
  }

  addUser() {
        this.searchModal.open().then((user) => {this.handleModalResult(user); this.selectedResult = user;}, ignoreModalClose);
  }

  saveOrganization(){
    this.organizationModel =  new OrganizationModel();
    this.organizationModel.name_fi = this.name_fi;
    this.organizationModel.name_en = this.name_en;
    this.organizationModel.name_sv = this.name_sv;

    this.organizationService.createOrganization(this.organizationModel);
  }

  handleModalResult(user: UserModel){
    if (user.email != null) {
      this.userModel = user;
      this.organizationUser.setUser(user);
    }
  }
}

class OrganizationUser {
  role ="";
  name ="";
  email = "";
  constructor() {

  }
  setUser(userModel: UserModel){
    this.role = "ADMIN";
    this.name = userModel.name;
    this.email = userModel.email;
  }
}
