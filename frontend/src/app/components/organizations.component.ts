import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { Observable } from "rxjs/Observable";
import { OrganizationModel } from '../apina';

@Component({
  selector: 'app-organizations',
  template: `<div class="col-md-12">
    <h2 translate>Organization list</h2>
    <ul>
      <li *ngFor="let organization of allOrganizations">
      {{organization.print()}}
        <pre>{{organization | json}}</pre>
      </li>
    </ul>
  </div>    `,
  styleUrls: ['./organizations.component.scss']
})

export class OrganizationsComponent implements OnInit {

  allOrganizations : Organization[];
  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(organizationModels => {
      this.allOrganizations = organizationModels.map(organizationModel => new Organization(organizationModel));
    });
  }

}

class Organization {

    constructor(private organizationModel: OrganizationModel) { }

    print() {
      return `- = ${this.organizationModel.id} ${this.organizationModel.name_en} ${this.organizationModel.name_fi} ${this.organizationModel.name_sv} ${this.organizationModel.url} = -`;
    }
  }
