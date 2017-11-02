import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { OrganizationListItem } from '../apina';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations',
  template: `
    <div class="row add-new-organization">
      <div class="col-md-12">

        <h2 translate>Organizations</h2>
        <button class="button btn-default" (click)="addOrganization()">
          <span translate>Add new organization</span>
        </button>
        <button class="button btn-default" (click)="browseUsers()">
          <span translate>Browse users</span>
        </button>
      </div>
      <ul id="organizations-list">
        <li *ngFor="let organization of organizations" [routerLink]="['/organization', organization.id]">
          {{organization.name | translateValue}}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./organizations.component.scss']
})

export class OrganizationsComponent implements OnInit {

  organizations: OrganizationListItem[];

  constructor(private organizationService: OrganizationService,
              private router: Router) {
  }

  ngOnInit() {
    this.organizationService.getOrganizationList().subscribe(organizationListItems => {
      this.organizations = organizationListItems;
    });
  }

  addOrganization() {
    this.router.navigate(['/newOrganization']);
  }

  browseUsers() {
    this.router.navigate(['/users']);
  }
}
