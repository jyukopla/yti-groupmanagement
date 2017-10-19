import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from "../services/location.service";
import {isDefined, Restrict, SearchModalService} from "./search-modal.component";
import {ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {OrganizationModel, UserModel} from "../apina";
import {UserService} from "../services/user.service";
import {OrganizationService} from "../services/organization.service";

@Component({
  selector: 'app-neworganization',
  template: `<div class="container">
    <h2 translate>New organization</h2>
    <ul id="organizations">
    
      <div class="form-group">
        <div id="organization">
        <label for="name_fi" translate>Name FI</label>
        <input type="text" class="form-control" id="name_fi" [(ngModel)]="name_fiValue" required>
        <label for="name_fi" translate>Description FI</label>
          <textarea id="description_fi" class="form-control" rows="4" [(ngModel)]="description_fiValue"></textarea>
        </div>
        <div id="organization">
        <label for="name_en" translate>Name EN</label>
        <input type="text" class="form-control" id="name_en" [(ngModel)]="name_enValue" required>
        <label for="name_en" translate>Description EN</label>
          <textarea id="description_en" class="form-control" rows="4" [(ngModel)]="description_enValue"></textarea>
        </div>
        <div id="organization">
        <label for="name_sv" translate>Name SV</label>
        <input type="text" class="form-control" id="name_sv" [(ngModel)]="name_svValue" required>
        <label for="name_sv" translate>Description SV</label>
          <textarea id="description_sv" class="form-control" rows="4" [(ngModel)]="description_svValue"></textarea>
          <button type="submit" class="btn btn-success" (click)="saveOrganization(name_fiValue, name_enValue, name_svValue)" translate>Save</button>
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
                <td>{{this.organizationUser.name}}<p>{{this.organizationUser.email}}</td>
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

  name_fiValue = "";
  name_enValue = "";
  name_svValue = "";
  description_fiValue ="";
  description_enValue ="";
  description_svValue ="";

  userService: UserService;
  organizationService: OrganizationService;
  selectedMember: Promise<any>;
  selectedResult = {};

  userModel = new UserModel;
  organizationUser: OrganizationUser;
  organizationModel: OrganizationModel;


  constructor(locationService: LocationService,
              private searchModal: SearchModalService,
              userService: UserService,
              organizationService: OrganizationService) {
    this.userService = userService;
    this.organizationService = organizationService;
    locationService.atAddNewOrganization();
  }

  ngOnInit() {
    this.organizationUser = new OrganizationUser();
  }

  addUser() {
        this.searchModal.openForUser().then((resultPromise) => {this.handleResult(resultPromise); this.selectedResult = resultPromise;}, ignoreModalClose);
  }

  saveOrganization(name_fiValue, name_enValue, name_svValue){
    this.organizationModel =  new OrganizationModel();
    this.organizationModel.name_fi = name_fiValue;
    this.organizationModel.name_en = name_enValue;
    this.organizationModel.name_sv = name_svValue;

    this.organizationService.createOrganization(this.organizationModel);
  }

  handleResult(resultPromise){
    if (resultPromise.email != null) {
      this.userModel = resultPromise;
      this.organizationUser.setUser(resultPromise);
    }
  }
}

export function ignoreModalClose(err: any) {
    if (!isModalClose(err)) {
    throw err;
  }
}

export function isModalClose(err: any) {
  return err === 'cancel' || err !== ModalDismissReasons.BACKDROP_CLICK || err === ModalDismissReasons.ESC;
}

class OrganizationUser {
  role: string;
  name: string;
  email: string;

  constructor() {
    this.role ="";
    this.name ="";
    this.email = "";
  }
  setUser(userModel: UserModel){
    this.role = "ADMIN";
    this.name = userModel.name;
    this.email = userModel.email;
  }
}
