import { Injectable } from '@angular/core';
import { OrganizationEndpoint, OrganizationListItem, OrganizationModel, UUID } from '../apina';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrganizationService {

  constructor(private endpoint: OrganizationEndpoint) {}

    getOrganizationList(): Observable<OrganizationListItem[]> {
      return this.endpoint.getOrganizations();
   }

    createOrganization(org: OrganizationModel): Observable<OrganizationModel> {
      return this.endpoint.createOrganization(org);
    }

    updateOrganization(org: OrganizationModel): void {
      this.endpoint.updateOrganization(org);
    }

    getOrganization(id: UUID): Observable<OrganizationModel> {
      return this.endpoint.getOrganization(id);
    }
  }
