import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { AuthorizationManager } from '../services/authorization-manager.service';

@Component({
  selector: 'app-frontpage',
  styleUrls: ['./frontpage.component.scss'],
  template: `
    <div class="content-box">

      <ngb-tabset>
        <ngb-tab>
          <ng-template ngbTabTitle>
            <span translate>ORGANIZATIONS</span>
          </ng-template>

          <ng-template ngbTabContent>
            <app-user-requests></app-user-requests>
            <app-organizations></app-organizations>
          </ng-template>
        </ngb-tab>

        <ngb-tab *ngIf="canBrowseUsers()">
          <ng-template ngbTabTitle>
            <span translate>USERS</span>
          </ng-template>

          <ng-template ngbTabContent>
            <app-user-requests></app-user-requests>
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
