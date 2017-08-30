import { Injectable } from "@angular/core";
import { TestEndpoint, TestInfo } from '../apina';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TestService {

  constructor(private endpoint: TestEndpoint) {
  }

  getTest(): Observable<TestInfo> {
    return this.endpoint.getTest();
  }
}
