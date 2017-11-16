package fi.vm.yti.groupmanagement.model;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class UserRequestWithOrganization {
    public Integer id;
    public String email;
    public UUID organizationId;
    public String role;
    public String firstName;
    public String lastName;
    boolean sent = false;
    private final HashMap<String, String> organizationName;


    public UserRequestWithOrganization(Integer id, String userEmail, UUID organizationId, String roleName, String firstName, String lastName,
                            String orgNameFi, String orgNameEn, String orgNameSv, Boolean sent) {

        HashMap<String, String> orgName = new HashMap<>(3);
        orgName.put("fi", orgNameFi);
        orgName.put("en", orgNameEn);
        orgName.put("sv", orgNameSv);

        this.id = id;
        this.email = userEmail;
        this.organizationId = organizationId;
        this.role = roleName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.organizationName = orgName;
        this.sent = sent;

    }

    public UserRequestWithOrganization() {
        this.organizationName = new HashMap<>();
    }

    public Integer getID() { return id; }

    public String getEmail() { return email; }

    public UUID getOrganizationId() {
        return organizationId;
    }

    public String getRole() { return role; }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getFullName() {return firstName + " " + lastName;}

    public Boolean isSent() {return sent;}

    public Map<String, String> getOrganizationName() {
        return organizationName;
    }
}
