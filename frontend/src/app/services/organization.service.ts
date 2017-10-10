import { Injectable } from '@angular/core';
import { OrganizationEndpoint, OrganizationModel } from '../apina';
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrganizationService {

  constructor(private endpoint: OrganizationEndpoint) {}

    getOrganizations(): Observable<OrganizationModel[]> {
      return this.endpoint.getOrganizations();
   }

    putOrganization(org: OrganizationModel): Observable<OrganizationModel> {
      return this.endpoint.putOrganization(org);
    }

    postOrganization(org: OrganizationModel): void {
      this.endpoint.postOrganization(org);
    }
  }
