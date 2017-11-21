package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.*;
import org.dalesbred.Database;
import org.dalesbred.query.QueryBuilder;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import static fi.vm.yti.groupmanagement.util.CollectionUtil.mapToList;

@Repository
public class FrontendDao {

    private final Database db;

    @Autowired
    public FrontendDao(Database db) {
        this.db = db;
    }

    public List<User> getUsers() {
        return db.findAll(User.class,"SELECT firstName, lastName, email, superuser FROM \"user\"");
    }

    public @NotNull List<UserOrganization> getUserOrganizationList() {

        return db.findAll(UserOrganization.class, "SELECT uo.user_email, us.firstname, us.lastname, org.description_fi, org.description_en, org.description_sv, org.name_fi, org.name_en, org.name_sv, uo.organization_id AS orgids, \n" +
                "uo.role_name AS roles FROM user_organization uo \n" +
                "LEFT JOIN organization org ON (uo.organization_id = org.id) \n" +
                "LEFT JOIN \"user\" us ON (us.email = uo.user_email) \n" +
                "ORDER BY us.lastname;");
    }

    public @NotNull List<OrganizationListItem> getOrganizationList() {

        List<OrganizationListItemRow> rows =
                db.findAll(OrganizationListItemRow.class, "SELECT id, name_en, name_fi, name_sv FROM organization ORDER BY name_fi");

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

    public @NotNull List<String> getAllRoles() {
        return db.findAll(String.class,"SELECT name FROM role");
    }

    public void addUserRequest(UserRequestModel userRequest) {
        db.update("INSERT INTO request (user_email, organization_id, role_name, sent) VALUES (?,?,?,?)",
                userRequest.email, userRequest.organizationId, userRequest.role, false);
    }

    public @NotNull List<UserRequestWithOrganization> getAllUserRequestsForOrganizations(@Nullable Set<UUID> organizations) {

        QueryBuilder builder = new QueryBuilder(
                "SELECT r.id, r.user_email, r.organization_id, r.role_name, us.firstName, us.lastName, org.name_fi, org.name_en, org.name_sv, r.sent \n" +
                        "FROM request r\n" +
                        "LEFT JOIN \"user\" us ON (us.email = r.user_email)\n" +
                        "LEFT JOIN organization org ON (org.id = r.organization_id)\n");

        if (organizations != null) {
            builder.append("WHERE r.organization_id in (").appendPlaceholders(organizations).append(")");
        }

        return db.findAll(UserRequestWithOrganization.class, builder.build());
    }

    public void deleteUserRequest(int requestId) {
        db.update("DELETE FROM request WHERE id=?", requestId);
    }

    public @NotNull UserRequest getUserRequest(int requestId) {
        return db.findUnique(UserRequest.class,
                "SELECT r.id, r.user_email, r.organization_id, r.role_name, r.sent FROM request r\n" +
                        "WHERE r.id = ?", requestId);
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
