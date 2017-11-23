import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {OrganizationListItem} from '../apina';
import {Router} from '@angular/router';
import {AuthorizationManager} from '../services/authorization-manager.service';
import {ApiService} from '../services/api.service';
import {LanguageService} from "../services/language.service";

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

export class OrganizationsComponent implements OnInit {

  organizations: OrganizationListItem[];
  currentLang: string;
  apiSub: any;

  constructor(private apiService: ApiService,
              public authorizationManager: AuthorizationManager,
              private router: Router,
              private languageService: LanguageService) {
  }

  ngOnInit() {
    this.languageService.languageChange$.asObservable().subscribe(lang => {
      if (this.currentLang === undefined)
        lang = 'fi';
      this.loadOrganizations(lang);
    });
    this.loadOrganizations('fi');
  }

  loadOrganizations(lang: string) {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
    }
    else
      this.apiSub.unsubscribe();

    this.apiSub = this.apiService.getOrganizationListLang(lang).subscribe(organizationListItems => {
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

