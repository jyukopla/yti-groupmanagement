package fi.vm.yti.groupmanagement.model;

import fi.vm.yti.security.Role;
import fi.vm.yti.security.YtiUser;
import org.jetbrains.annotations.NotNull;

import java.util.*;

public class AuthenticatedUser {

    private final boolean anonymous;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final boolean superuser;
    private final List<OrganizationRole> rolesInOrganizations = new ArrayList<>();

    public AuthenticatedUser(@NotNull YtiUser user) {

        this.anonymous = user.isAnonymous();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.superuser = user.isSuperuser();

        for (Map.Entry<UUID, Set<Role>> roleSetEntry : user.getRolesInOrganizations().entrySet()) {
            for (Role role : roleSetEntry.getValue()) {
                rolesInOrganizations.add(new OrganizationRole(role, roleSetEntry.getKey()));
            }
        }
    }

    public boolean isAnonymous() {
        return anonymous;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean isSuperuser() {
        return superuser;
    }

    public List<OrganizationRole> getRolesInOrganizations() {
        return rolesInOrganizations;
    }

    public static class OrganizationRole {

        private final Role role;
        private final UUID organization;

        OrganizationRole(Role role, UUID organization) {
            this.role = role;
            this.organization = organization;
        }

        public Role getRole() {
            return role;
        }

        public UUID getOrganization() {
            return organization;
        }
    }
}
