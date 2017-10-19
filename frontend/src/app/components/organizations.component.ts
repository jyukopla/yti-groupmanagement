import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { Observable } from "rxjs/Observable";
import { OrganizationModel } from '../apina';
import {Router} from "@angular/router";

@Component({
  selector: 'app-organizations',
  template: `<div class="row add-new-organization">
    <div class="col-md-12">
      
    <h2 style="display: inline-block" translate>Organizations</h2>        
      <button class="button btn-default" (click)="addOrganization()">
        <span translate>Add new organization</span>
      </button>
      <button class="button btn-default" >
        <span translate>Browse users</span>
      </button>
    </div>
    <ul id="organizations-list">
      <li *ngFor="let organization of allOrganizations" style="margin-left: 10px">
      {{organization.getName()}}
      </li>
    </ul>
  </div>    `,
  styleUrls: ['./organizations.component.scss']
})

export class OrganizationsComponent implements OnInit {

  allOrganizations : Organization[];
  constructor(private organizationService: OrganizationService,
              private router: Router) { }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(organizationModels => {
      this.allOrganizations = organizationModels.map(organizationModel => new Organization(organizationModel));
    });
  }

  addOrganization() {
    this.router.navigate(['/newOrganization']);
  }
}

class Organization {

    constructor(private organizationModel: OrganizationModel) { }

    getName() {
      return this.organizationModel.name_fi;
    }

    print() {
      return `- = ${this.organizationModel.id} ${this.organizationModel.name_en} ${this.organizationModel.name_fi} ${this.organizationModel.name_sv} ${this.organizationModel.url} = -`;
    }
  }
