import { Component, OnDestroy } from '@angular/core';
import { OrganizationListItem } from '../apina';
import { Router } from '@angular/router';
import { AuthorizationManager } from '../services/authorization-manager.service';
import { ApiService } from '../services/api.service';
import { LanguageService } from '../services/language.service';
import { comparingLocalizable } from '../utils/comparator';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-organizations',
  template: `
    <div class="row add-new-organization">
      <div class="col-md-12">

        <h2 translate>Organizations</h2>
        <button class="button btn-default" (click)="addOrganization()"
                *ngIf="authorizationManager.canCreateOrganization()">
          <span translate>Add new organization</span>
        </button>

        <button class="button btn-default" (click)="browseUsers()" *ngIf="authorizationManager.canBrowseUsers()">
          <span translate>Browse users</span>
        </button>
      </div>
      <ul id="organizations-list">
        <a *ngFor="let organization of organizations" [routerLink]="['/organization', organization.id]">
          {{organization.name | translateValue}} <br>
        </a>
      </ul>
    </div>
  `,
  styleUrls: ['./organizations.component.scss']
})

export class OrganizationsComponent implements OnDestroy {

  organizations: OrganizationListItem[];

  languageSubscription: Subscription;

  constructor(private apiService: ApiService,
              public authorizationManager: AuthorizationManager,
              private router: Router,
              private languageService: LanguageService) {

    this.apiService.getOrganizationList().subscribe(organizationListItems => {
      this.organizations = organizationListItems;
      this.sortOrganizations();
    });

    this.languageSubscription = languageService.languageChange$.subscribe(() => this.sortOrganizations());
  }

  sortOrganizations() {
    this.organizations.sort(comparingLocalizable<OrganizationListItem>(this.languageService, org => org.name));
  }

  addOrganization() {
    this.router.navigate(['/newOrganization']);
  }

  browseUsers() {
    this.router.navigate(['/users']);
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}

