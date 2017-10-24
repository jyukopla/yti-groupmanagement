import { Injectable } from '@angular/core';
import { Localizable } from '../entities/localization';
import { Subject } from 'rxjs';

export interface Location {
  localizationKey?: string;
  label?: Localizable;
  route?: string[];
}

const frontPage = { localizationKey: 'Front page', route: [''] };
const newOrganization = { localizationKey: 'Add new organization', route: ['/newOrganization'] };
const organizationDetails = { localizationKey: 'Organization', route: ['/organizationDetails'] };

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

  atOrganizationDetails(): void {
    this.changeLocation([organizationDetails]);
  }
}
