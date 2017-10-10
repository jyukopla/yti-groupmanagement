import { Injectable } from '@angular/core';
import { OrganizationEndpoint, OrganizationModel } from '../apina';
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrganizationService {

  constructor(private endpoint: OrganizationEndpoint) {}

    getOrganizations(): Observable<OrganizationModel[]> {
      return this.endpoint.getOrganizations();
   }

    createOrganization(org: OrganizationModel): Observable<OrganizationModel> {
      return this.endpoint.createOrganization(org);
    }

    updateOrganization(org: OrganizationModel): void {
      this.endpoint.updateOrganization(org);
    }
  }
