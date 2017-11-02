package fi.vm.yti.groupmanagement.model;

import java.util.Collections;
import java.util.List;

public final class PublicApiUser {

    private final String email;
    private final String firstName;
    private final String lastName;
    private final boolean superuser;
    private final boolean newlyCreated;
    private final List<PublicApiUserOrganization> organization;

    public PublicApiUser(String email, String firstName, String lastName, boolean superuser, boolean newlyCreated, List<PublicApiUserOrganization> organization) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.superuser = superuser;
        this.newlyCreated = newlyCreated;
        this.organization = Collections.unmodifiableList(organization);
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

    public boolean isNewlyCreated() {
        return newlyCreated;
    }

    public List<PublicApiUserOrganization> getOrganization() {
        return organization;
    }
}