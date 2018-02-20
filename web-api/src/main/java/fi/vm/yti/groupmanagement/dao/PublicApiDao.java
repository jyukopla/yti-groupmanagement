package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.*;
import org.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static fi.vm.yti.groupmanagement.util.CollectionUtil.requireSingleOrNone;
import static java.util.Collections.unmodifiableMap;
import static java.util.Objects.requireNonNull;
import static java.util.stream.Collectors.*;

@Repository
public class PublicApiDao {

    private final Database database;

    @Autowired
    public PublicApiDao(Database database) {
        this.database = database;
    }

    public @NotNull PublicApiUser createUser(@NotNull String email, @NotNull String firstName, @NotNull String lastName) {
        this.database.update("INSERT INTO \"user\" (email, firstName, lastName, superuser) VALUES (?,?,?,?)",
                email, firstName, lastName, false);

        return requireNonNull(findUser(email));
    }

    public @NotNull PublicApiUser getUser(@NotNull  String email) {
        return requireNonNull(findUser(email));
    }

    public @Nullable PublicApiUser findUser(@NotNull  String email) {

        List<UserRow> rows = database.findAll(UserRow.class,
                "SELECT u.email, u.firstName, u.lastName, u.superuser, uo.organization_id, u.created_at, array_agg(uo.role_name) AS roles \n" +
                        "FROM \"user\" u \n" +
                        "  LEFT JOIN user_organization uo ON (uo.user_email = u.email) \n" +
                        "WHERE u.email = ? \n" +
                        "GROUP BY u.email, u.firstName, u.lastName, u.superuser, uo.organization_id, u.created_at", email);

        return requireSingleOrNone(rowsToAuthorizationUsers(rows));
    }

    public List<PublicApiUserListItem> getUsers() {
        return database.findAll(PublicApiUserListItem.class,
                "SELECT email, firstName, lastName FROM \"user\" ORDER BY lastname, firstname");
    }

    public @NotNull List<PublicApiOrganization> getOrganizations() {

        List<OrganizationRow> rows = database.findAll(OrganizationRow.class, "select id, name_en, name_sv, name_fi, description_en, description_sv, description_fi, url, removed from organization");

        return rows.stream().map(row -> {

            Map<String, String> prefLabel = new HashMap<>(3);
            Map<String, String> description = new HashMap<>(3);

            prefLabel.put("fi", row.nameFi);
            prefLabel.put("en", row.nameEn);
            prefLabel.put("sv", row.nameSv);

            description.put("fi", row.descriptionFi);
            description.put("en", row.descriptionEn);
            description.put("sv", row.descriptionSv);

            return new PublicApiOrganization(row.id, unmodifiableMap(prefLabel), unmodifiableMap(description), row.url, row.removed);

        }).collect(toList());
    }

    public void addUserRequest(String email, UUID organizationId, String role) {
        database.update("INSERT INTO request (user_email, organization_id, role_name, sent) VALUES (?,?,?,?)",
                email, organizationId, role, false);
    }

    private static PublicApiUser entryToAuthorizationUser(Map.Entry<UserRow.UserDetails, List<UserRow.OrganizationDetails>> entry) {

        UserRow.UserDetails user = entry.getKey();

        List<PublicApiUserOrganization> nonNullOrganizations = entry.getValue().stream()
                .filter(org -> org.id != null)
                .map(org -> new PublicApiUserOrganization(org.id, org.roles))
                .collect(toList());

        return new PublicApiUser(user.email, user.firstName, user.lastName, user.superuser, false, user.creationDateTime, nonNullOrganizations);
    }

    private static List<PublicApiUser> rowsToAuthorizationUsers(List<UserRow> rows) {

        Map<UserRow.UserDetails, List<UserRow.OrganizationDetails>> grouped =
                rows.stream().collect(
                        groupingBy(row -> row.user,
                                mapping(row -> row.organization, toList())));

        return grouped.entrySet().stream().map(PublicApiDao::entryToAuthorizationUser).collect(toList());
    }

    public List<PublicApiUserRequest> getUserRequests(String email) {
        return database.findAll(PublicApiUserRequest.class,
                "SELECT organization_id, array_agg(role_name)\n" +
                        "FROM request\n" +
                        "WHERE user_email = ? \n" +
                        "GROUP BY organization_id", email);
    }

    public static final class OrganizationRow {

        public UUID id;
        public String url;
        public String nameEn;
        public String nameFi;
        public String nameSv;
        public String descriptionEn;
        public String descriptionFi;
        public String descriptionSv;
        public Boolean removed;
    }
}
