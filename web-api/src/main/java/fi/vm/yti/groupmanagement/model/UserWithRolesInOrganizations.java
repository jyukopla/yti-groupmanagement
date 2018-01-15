package fi.vm.yti.groupmanagement.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class UserWithRolesInOrganizations {

    public String email;
    public String firstName;
    public String lastName;
    public boolean superuser;
    public LocalDateTime creationDateTime;
    public List<OrganizationRoles> organizations;

    public UserWithRolesInOrganizations(String email, String firstName, String lastName, boolean superuser, LocalDateTime creationDateTime, List<OrganizationRoles> organizations) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.superuser = superuser;
        this.creationDateTime = creationDateTime;
        this.organizations = organizations;
    }

    public static class OrganizationRoles {

        public UUID id;
        public List<String> roles;

        public OrganizationRoles(UUID id, List<String> roles) {
            this.id = id;
            this.roles = roles;
        }
    }
}
