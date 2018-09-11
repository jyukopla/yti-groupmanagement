import { Config } from '../entities/config';
import { Observable } from 'rxjs';

import {ConfigEndpoint, ConfigurationModel} from "../apina";


export class ConfigService {

  configuration:Observable<Config>;

  constructor(private endpoint: ConfigEndpoint) {

  }

  getConfig(): Observable<ConfigurationModel>  {
    return this.endpoint.getConfiguration();
  }
}
