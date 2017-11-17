package fi.vm.yti.groupmanagement.model;

import java.util.HashMap;
import java.util.UUID;

public class UserRequestWithOrganization {

    public Integer id;
    public String email;
    public UUID organizationId;
    public String role;
    public String firstName;
    public String lastName;
    public boolean sent = false;
    public final HashMap<String, String> organizationName = new HashMap<>(3);

    public UserRequestWithOrganization(Integer id, String userEmail, UUID organizationId, String roleName, String firstName, String lastName,
                            String orgNameFi, String orgNameEn, String orgNameSv, Boolean sent) {

        organizationName.put("fi", orgNameFi);
        organizationName.put("en", orgNameEn);
        organizationName.put("sv", orgNameSv);

        this.id = id;
        this.email = userEmail;
        this.organizationId = organizationId;
        this.role = roleName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sent = sent;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
