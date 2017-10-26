package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.OrganizationListItem;
import fi.vm.yti.groupmanagement.model.Organization;
import fi.vm.yti.groupmanagement.model.User;
import fi.vm.yti.groupmanagement.model.UserWithRoles;
import org.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static fi.vm.yti.groupmanagement.util.CollectionUtil.mapToList;

@Repository
public class OrganizationDao {

    private final Database db;

    @Autowired
    public OrganizationDao(Database db) {
        this.db = db;
    }

    public @NotNull List<OrganizationListItem> getOrganizationList() {

        List<OrganizationListItemRow> rows =
                db.findAll(OrganizationListItemRow.class, "SELECT id, name_en, name_fi, name_sv FROM organization");

        return mapToList(rows, row -> new OrganizationListItem(row.id, row.nameFi, row.nameEn, row.nameSv));
    }

    public @NotNull Organization getOrganization(UUID organizationId) {
        return db.findUnique(Organization.class,"SELECT id, name_en, name_fi, name_sv, description_en, description_fi, description_sv, url FROM organization where id = ?", organizationId);
    }

    public @NotNull List<UserWithRoles> getOrganizationUsers(UUID organizationId) {

        List<UserWithRolesRow> rows = db.findAll(UserWithRolesRow.class,
                "SELECT u.email, u.firstName, u.lastName, u.superuser, array_agg(uo.role_name) AS roles \n" +
                        "FROM \"user\" u \n" +
                        "  LEFT JOIN user_organization uo ON (uo.user_email = u.email) \n" +
                        "WHERE uo.organization_id = ? \n" +
                        "GROUP BY u.email, u.firstName, u.lastName, u.superuser", organizationId);

        return mapToList(rows, row -> {

            UserWithRoles result = new UserWithRoles();
            User user = new User();
            user.email = row.email;
            user.firstName = row.firstName;
            user.lastName = row.lastName;
            user.superuser = row.superuser;
            result.user = user;
            result.roles = row.roles;
            return result;
        });
    }

    public @NotNull List<String> getAvailableRoles() {
        return db.findAll(String.class, "SELECT name from role");
    }

    public void createOrganization(Organization org) {

        db.update("INSERT INTO organization (id, name_en, name_fi, name_sv, description_en, description_fi, description_sv, url) VALUES (?,?,?,?,?,?,?,?)",
                org.id, org.nameEn, org.nameFi, org.nameSv, org.descriptionEn, org.descriptionFi, org.descriptionSv, org.url);
    }

    public void updateOrganization(Organization org) {

        db.update("UPDATE organization SET name_en=?, name_fi=?, name_sv=?, description_en=?, description_fi=?, description_sv=?, url=? WHERE id = ?",
                org.nameEn, org.nameFi, org.nameSv, org.descriptionEn, org.descriptionFi, org.descriptionSv, org.url, org.id);
    }

    public void addUserToRoleInOrganization(String userEmail, String role, UUID id) {
        db.update("INSERT INTO user_organization (user_email, organization_id, role_name) VALUES (?, ?, ?)", userEmail, id, role);
    }

    public void clearUserRoles(UUID id) {
        db.update("DELETE FROM user_organization uo where uo.organization_id = ?", id);
    }

    public static class OrganizationListItemRow {

        public UUID id;
        public String nameFi;
        public String nameEn;
        public String nameSv;
    }

    public static class UserWithRolesRow {

        public String email;
        public String firstName;
        public String lastName;
        public boolean superuser;
        public List<String> roles;
    }
}
