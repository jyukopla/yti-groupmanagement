import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-frontpage',
  styleUrls: ['./frontpage.component.scss'],
  template: `
    <div class="container-fluid">
      <div class="page-header row">
        <div class="col-md-12 mx-auto">
          <div class="row">
            <div class="col-md-12">
              <app-organizations></app-organizations>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})

export class FrontpageComponent {

  constructor(locationService: LocationService) {
    locationService.atFrontPage();
  }
}
