import { OrganizationRoles, UserWithRolesInOrganizations } from '../apina';

export class User {

  firstName: string;
  lastName: string;
  email: string;
  superuser: boolean;
  organizations: OrganizationRoles[];

  constructor(user: UserWithRolesInOrganizations) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.superuser = user.superuser;
    this.organizations = user.organizations;
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }
}
