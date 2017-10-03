import { Component, OnInit } from '@angular/core';

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
    </ul>
    
  </div>`,
  styleUrls: ['./neworganization.component.scss']
})
export class NewOrganizationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
