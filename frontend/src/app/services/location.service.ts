import { Injectable } from '@angular/core';
import { Localizable } from 'yti-common-ui/types/localization';
import { Subject } from 'rxjs/Subject';
import { OrganizationDetails } from '../entities/organization-details';

export interface Location {
  localizationKey?: string;
  label?: Localizable;
  route?: string[];
}

const frontPage = { localizationKey: 'Front page', route: [''] };
const newOrganization = { localizationKey: 'Add new organization' };

@Injectable()
export class LocationService {

  location = new Subject<Location[]>();

  private changeLocation(location: Location[]): void {
    location.unshift(frontPage);
    this.location.next(location);
  }

  atFrontPage(): void {
    this.changeLocation([]);
  }

  atAddNewOrganization(): void {
    this.changeLocation([newOrganization]);
  }

  atOrganization(organization: OrganizationDetails): void {
    this.changeLocation([{ label: organization.name }]);
  }

  atUserDetails() {
    this.changeLocation([{ localizationKey: 'User details' }]);
  }

  atInformationAboutService(): void {
    this.changeLocation([{
      localizationKey: 'Information about the service',
        route: ['information']
    }]);
  }
}
