import { AuthenticatedUser as ApinaAuthenticatedUser, UUID } from '../apina';

type Role = 'ADMIN'
          | 'DATA_MODEL_EDITOR'
          | 'TERMINOLOGY_EDITOR'
          | 'CODE_LIST_EDITOR';

export class AuthenticatedUser {

  anonymous: boolean;
  email: string;
  firstName: string;
  lastName: string;
  superuser: boolean;
  rolesInOrganizations = new Map<string, Set<Role>>();

  constructor(user: ApinaAuthenticatedUser) {
    this.anonymous = user.anonymous;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.superuser = user.superuser;

    for (const organizationRole of user.rolesInOrganizations) {
      this.getRolesInOrganization(organizationRole.organization).add(organizationRole.role as Role);
    }
  }

  private getRolesInOrganization(organizationId: UUID): Set<Role> {

    const roles = this.rolesInOrganizations.get(organizationId as string);

    if (roles) {
      return roles;
    } else {
      const newSet = new Set<Role>();
      this.rolesInOrganizations.set(organizationId as string, newSet);
      return newSet;
    }
  }

  isAdmin(organizationId: UUID): boolean {
    return this.getRolesInOrganization(organizationId).has('ADMIN');
  }

  isAdminInAnyOrganization() {

    for (const roles of Array.from(this.rolesInOrganizations.values())) {
      if (roles.has('ADMIN')) {
        return true;
      }
    }

    return false;
  }
}
