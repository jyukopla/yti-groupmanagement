package fi.vm.yti.groupmanagement.dao;

import java.util.List;
import java.util.UUID;

public final class UserRow {

    UserDetails user = new UserDetails();
    OrganizationDetails organization = new OrganizationDetails();

    public UserRow(String email,
                   String firstName,
                   String lastName,
                   boolean superuser,
                   UUID organizationId,
                   List<String> roles) {

        this.user.email = email;
        this.user.firstName = firstName;
        this.user.lastName = lastName;
        this.user.superuser = superuser;
        this.organization.id = organizationId;
        this.organization.roles = roles;
    }

    public static final class UserDetails {

        String email;
        String firstName;
        String lastName;
        boolean superuser;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            UserDetails user = (UserDetails) o;

            return email.equals(user.email);
        }

        @Override
        public int hashCode() {
            return email.hashCode();
        }
    }

    public static final class OrganizationDetails {

        UUID id;
        List<String> roles;
    }
}
