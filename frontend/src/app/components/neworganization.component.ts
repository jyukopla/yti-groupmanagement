import {Component, Input, OnInit} from '@angular/core';
import {LocationService} from "../services/location.service";
import {isDefined, Restrict, SearchModalService} from "./search-modal.component";
import {ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {UserModel} from "../apina";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-neworganization',
  template: `<div class="container">
    <h2 translate>New organization</h2>
    <ul id="organizations">
    <form>
      <div class="form-group">
        <div id="organization">
        <label for="name_fi" translate>Name FI</label>
        <input type="text" class="form-control" id="name_fi" required>
        <label for="name_fi" translate>Description FI</label>
          <textarea id="description_fi" class="form-control" rows="4"></textarea>
        </div>
        <div id="organization">
        <label for="name_en" translate>Name EN</label>
        <input type="text" class="form-control" id="name_en" required>
        <label for="name_en" translate>Description EN</label>
          <textarea id="description_en" class="form-control" rows="4"></textarea>
        </div>
        <div id="organization">
        <label for="name_sv" translate>Name SV</label>
        <input type="text" class="form-control" id="name_sv" required>
        <label for="name_sv" translate>Description SV</label>
          <textarea id="description_sv" class="form-control" rows="4"></textarea>
          <button type="submit" class="btn btn-success" translate>Save</button>
        </div>        
      </div>      

    </form>
      </ul>
    <br>
    
    <h3>Ryhmän jäsenet</h3>
    <ul id="organization_users">
      <p></p>
      
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
  userService: UserService;
  constructor(locationService: LocationService,
              private searchModal: SearchModalService,
              userService: UserService) {
    this.userService = userService;
    locationService.atAddNewOrganization();
  }

  ngOnInit() {
  }

  addUser() {

    /*const restricts: Restrict[] = [
      ...(isDefined(this.self) ? [{ graphId: this.self.graphId, conceptId: this.self.id, reason: 'self reference error'}] : []),
      ...this.reference.value.map(({ graphId, id }) => ({ graphId, conceptId: id, reason: 'already added error'}))
    ];*/

    this.searchModal.openForGraph("User" , '', null)
      .then(result => this.userService.addUser(result), ignoreModalClose);
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
