import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {OrganizationService} from "../services/organization.service";
import {OrganizationModel, UserModel, UUID} from "../apina";
import {ignoreModalClose} from "../utils/modal";
import {SearchUserModalService} from "./search-user-modal.component";
import {LocationService} from "../services/location.service";
import {User} from "../entities/user";

@Component({
  selector: 'app-organization-details',
  template: '<div class="container">' +
  '<h2 translate>Organization</h2>' +
  '      <ul id="organizations">' +
  '        <div class="form-group">' +
  '          <div id="organization">' +
  '          <label for="name_fi" translate>Name FI</label>' +
  '          <input type="text" class="form-control" id="name_fi" [(ngModel)]="name_fi" required>' +
  '          <label for="name_fi" translate>Description FI</label>' +
  '            <textarea id="description_fi" class="form-control" rows="4" [(ngModel)]="description_fi"></textarea>' +
  '          </div>' +
  '          <div id="organization">' +
  '          <label for="name_en" translate>Name EN</label>' +
  '          <input type="text" class="form-control" id="name_en" [(ngModel)]="name_en" required>' +
  '          <label for="name_en" translate>Description EN</label>' +
  '            <textarea id="description_en" class="form-control" rows="4" [(ngModel)]="description_en"></textarea>' +
  '         </div>' +
  '         <div id="organization">' +
  '         <label for="name_sv" translate>Name SV</label>' +
  '         <input type="text" class="form-control" id="name_sv" [(ngModel)]="name_sv" required>' +
  '         <label for="name_sv" translate>Description SV</label>' +
  '           <textarea id="description_sv" class="form-control" rows="4" [(ngModel)]="description_sv"></textarea>' +
  '           <button type="submit" class="btn btn-success" (click)="saveOrganization()" translate>Save</button>' +
  '         </div>' +
  '       </div>' +
  '     </ul>' +
  '     <br>' +
  '     <h3 translate>Group members</h3>' +
  '     <ul id="organization_users">' +
  '       <p></p>' +
  '       <table style="width:100%">' +
  '       <thead>' +
  '         <tr>' +
  '         <th translate>User</th>' +
  '         <th translate>Role</th>' +
  '         <th translate>Application</th>' +
  '         </tr>' +
  '       </thead>' +
  '     <tbody>' +
  '       <tr >' +
  '       <td>{{this.organizationUser.firstName}} {{this.organizationUser.lastName}}<p>{{this.organizationUser.email}}</p></td>' +
  '       <td>{{this.organizationUser.role}}</td>' +
  '       </tr>' +
  '     </tbody>' +
  '     </table>' +
  '     </ul>' +
  '   <button type="button"class="btn btn-default" (click)="addUser()" translate>Add user</button>' +
  '</div>',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  organizationId: number;
  subPage: Subscription;
  organization: OrganizationModel;
  organizationUser: OrganizationUser;
  selectedResult = {};

  userModel = new UserModel;
  organizationModel: OrganizationModel;


  @Input() self?: UserModel;
  @Input() reference: UserModel;
  excludedUserEmails: Array<string>;


  name_fi = "";
  name_en = "";
  name_sv = "";
  description_fi ="";
  description_en ="";
  description_sv ="";


  constructor(private route: ActivatedRoute,
              private searchModal: SearchUserModalService,
              locationService: LocationService,
              public organizationService: OrganizationService) {

    locationService.atOrganizationDetails();
  }

  ngOnInit() {
      this.subPage = this.route.params.subscribe(params => { this.organizationId = params['id'];
      this.organizationService.getOrganization(this.organizationId).subscribe(org => {this.updateDetails(org)});
    });
  }

  updateDetails(org: OrganizationModel) {
    this.name_fi = org.name_fi;
    this.name_en = org.name_en;
    this.name_sv = org.name_sv;
    //this.description_fi = org.description_fi;
  }

  ngOnDestroy() {
    this.subPage.unsubscribe();
  }


  addUser() {
    this.searchModal.open(this.excludedUserEmails).then((user) => {this.handleModalResult(user); this.selectedResult = user;}, ignoreModalClose);
  }

  saveOrganization(){
    this.organizationModel =  new OrganizationModel();
    this.organizationModel.name_fi = this.name_fi;
    this.organizationModel.name_en = this.name_en;
    this.organizationModel.name_sv = this.name_sv;

    this.organizationService.createOrganization(this.organizationModel);
  }

  handleModalResult(user: User){
    if (user.email != null) {
      this.userModel = user.getUserModel();
      this.organizationUser.setUser(this.userModel);
    }
  }

}

class UserOrganization {
  UserEmail: string;
  organization: string;
  role: string;
  application: string;

  constructor() {}
}

class OrganizationUser {
  role ="";
  firstName ="";
  lastName ="";
  email = "";
  constructor() {

  }
  setUser(userModel: UserModel){
    this.role = "ADMIN";
    this.firstName = userModel.firstName;
    this.lastName = userModel.lastName;
    this.email = userModel.email;
  }
}
