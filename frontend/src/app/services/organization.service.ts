import { Injectable } from '@angular/core';
import { OrganizationEndpoint, OrganizationModel } from '../apina';
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrganizationService {

  constructor(private endpoint: OrganizationEndpoint) {}

    getOrganizations(): Observable<OrganizationModel[]> {
      return this.endpoint.getOrganizations();    
   }
  }