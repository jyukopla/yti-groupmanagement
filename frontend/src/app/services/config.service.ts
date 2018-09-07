import { Http } from '@angular/http';
import { Config } from '../entities/config';
import { config } from "../../config";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export class ConfigService {
  conf:Config;
  configuration:Observable<Config>;

  constructor(private $http: Http) {
    var endpoint = config.apiEndpointWithName('config');
    this.configuration = this.$http.get(endpoint)
      .pipe(map(res => res.json().results as Config));

  }

  getConfig(): Observable<Config>  {
    return this.configuration;
  }
}
