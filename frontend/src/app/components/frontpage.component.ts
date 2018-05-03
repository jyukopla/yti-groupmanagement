import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { AuthorizationManager } from '../services/authorization-manager.service';

@Component({
  selector: 'app-frontpage',
  styleUrls: ['./frontpage.component.scss'],
  template: `
    <div class="content-box">

      <app-user-requests></app-user-requests>
      
      <ngb-tabset>
        <ngb-tab id="organizations_tab">
          <ng-template ngbTabTitle>
            <span translate>ORGANIZATIONS</span>
          </ng-template>

          <ng-template ngbTabContent>
            <app-organizations></app-organizations>
          </ng-template>
        </ngb-tab>

        <ngb-tab id="users_tab" *ngIf="canBrowseUsers()">
          <ng-template ngbTabTitle>
            <span translate>USERS</span>
          </ng-template>

          <ng-template ngbTabContent>
            <app-users></app-users>
          </ng-template>
        </ngb-tab>
        
      </ngb-tabset>
      
    </div>
  `
})

export class FrontpageComponent {

  constructor(locationService: LocationService,
              private authorizationManager: AuthorizationManager) {
    locationService.atFrontPage();
  }

  canBrowseUsers(): boolean {
    return this.authorizationManager.canBrowseUsers();
  }
}
