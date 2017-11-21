package fi.vm.yti.groupmanagement.model;

import java.util.List;
import java.util.UUID;

public class UserWithRolesInOrganizations {

    public String email;
    public String firstName;
    public String lastName;
    public boolean superuser;
    public List<Organization> organizations;

    public UserWithRolesInOrganizations(String email, String firstName, String lastName, boolean superuser, List<Organization> organizations) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.superuser = superuser;
        this.organizations = organizations;
    }

    public static class Organization {

        public UUID id;
        public List<String> roles;

        public Organization(UUID id, List<String> roles) {
            this.id = id;
            this.roles = roles;
        }
    }
}
