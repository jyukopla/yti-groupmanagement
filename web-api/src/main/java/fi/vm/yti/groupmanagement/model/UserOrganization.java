package fi.vm.yti.groupmanagement.model;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class UserOrganization {

    private final UUID organizationId;
    private final String firstname, lastname;
    private final String userEmail;
    private final String userRole;
    private final HashMap<String, String> organizationName;
    private final HashMap<String, String> organizationDescription;


    public UserOrganization(String userEmail, String firstName, String lastName, String descriptionFi, String descriptionEn,
                            String descriptionSv, String nameFi, String nameEn, String nameSv, UUID organizationId, String roleName ) {

        HashMap<String, String> orgName = new HashMap<>(3);
        orgName.put("fi", nameFi);
        orgName.put("en", nameEn);
        orgName.put("sv", nameSv);

        HashMap<String, String> orgDescription = new HashMap<>(3);
        orgDescription.put("fi", descriptionFi);
        orgDescription.put("en", descriptionEn);
        orgDescription.put("sv", descriptionSv);

        this.userRole = roleName;
        this.organizationId = organizationId;
        this.organizationName = orgName;
        this.organizationDescription = orgDescription;
        this.firstname = firstName;
        this.lastname = lastName;
        this.userEmail = userEmail;

    }

    public UUID getId() {
        return organizationId;
    }

    public Map<String, String> getOrganizationName() {
        return organizationName;
    }

    public Map<String, String> getOrganizationDescription() {
        return organizationDescription;
    }

    public String getRole() { return userRole; }

    public String getUserName() { return (firstname + " " + lastname); }

}
