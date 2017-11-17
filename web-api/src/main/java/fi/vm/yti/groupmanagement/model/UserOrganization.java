package fi.vm.yti.groupmanagement.model;

import java.util.HashMap;
import java.util.UUID;

public class UserOrganization {

    public final UUID organizationId;
    public final String firstname;
    public final String lastname;
    public final String userEmail;
    public final String userRole;
    public final HashMap<String, String> organizationName;
    public final HashMap<String, String> organizationDescription;

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

    public String getUserName() {
        return firstname + " " + lastname;
    }
}
