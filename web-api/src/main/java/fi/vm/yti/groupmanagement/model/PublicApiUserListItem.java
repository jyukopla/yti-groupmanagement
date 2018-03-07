package fi.vm.yti.groupmanagement.model;

import java.util.UUID;

public class PublicApiUserListItem {

    private final String email;
    private final String firstName;
    private final String lastName;
    private final UUID id;

    public PublicApiUserListItem(String email, String firstName, String lastName, UUID id) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
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

    public UUID getId() { return id; }
}
