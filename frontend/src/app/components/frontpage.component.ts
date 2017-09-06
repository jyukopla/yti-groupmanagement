import { Component } from '@angular/core';
import { TestService } from '../services/test.service';
import { Observable } from 'rxjs/Observable';
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
              <h2>{{'Hello' | translate}} {{test | async}}!</h2>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class FrontpageComponent {

  test: Observable<string>;

  constructor(locationService: LocationService,
              testService: TestService) {

    locationService.atFrontPage();
    this.test = testService.getTest().map(t => t.name);
  }
}
