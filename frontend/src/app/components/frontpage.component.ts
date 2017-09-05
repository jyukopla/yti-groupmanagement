import { Component } from '@angular/core';
import { TestService } from '../services/test.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'frontpage',
  styleUrls: ['./frontpage.component.scss'],
  template: `
    <h2>Hello {{test | async}}!</h2>
  `
})
export class FrontpageComponent {

  test: Observable<string>;

  constructor(testService: TestService) {
    this.test = testService.getTest().map(t => t.name);
  }
}
