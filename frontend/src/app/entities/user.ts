import { OrganizationRoles, UserWithRolesInOrganizations } from '../apina';
import { Moment } from 'moment';
import * as moment from 'moment';

export class User {

  firstName: string;
  lastName: string;
  email: string;
  superuser: boolean;
  creationDateTime: Moment;
  organizations: OrganizationRoles[];

  constructor(user: UserWithRolesInOrganizations) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.superuser = user.superuser;
    this.creationDateTime = moment(user.creationDateTime);
    this.organizations = user.organizations;
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }
}
