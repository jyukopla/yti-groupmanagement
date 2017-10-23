package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.PublicApiUser;
import fi.vm.yti.groupmanagement.model.PublicApiUserOrganization;
import org.dalesbred.Database;
import org.dalesbred.annotation.DalesbredInstantiator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static fi.vm.yti.groupmanagement.util.CollectionUtil.requireSingle;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

@Repository
public class PublicApiDao {

    private final Database database;

    @Autowired
    public PublicApiDao(Database database) {
        this.database = database;
    }

    public PublicApiUser getUser(String email) {

        List<UserRow> rows = this.database.findAll(UserRow.class,
                "SELECT u.email, u.firstName, u.lastName, u.superuser, uo.organization_id, array_agg(uo.role_name) AS roles \n" +
                        "FROM \"user\" u \n" +
                        "  INNER JOIN user_organization uo ON (uo.user_email = u.email) \n" +
                        "WHERE u.email = ? \n" +
                        "GROUP BY u.email, u.firstName, u.lastName, u.superuser, uo.organization_id", email);

        return requireSingle(rowsToAuthorizationUsers(rows));
    }

    private static PublicApiUser entryToAuthorizationUser(Map.Entry<UserRow.UserDetails, List<PublicApiUserOrganization>> entry) {
        UserRow.UserDetails user = entry.getKey();
        return new PublicApiUser(user.email, user.firstName, user.lastName, user.superuser, false, entry.getValue());
    }

    private static List<PublicApiUser> rowsToAuthorizationUsers(List<UserRow> rows) {

        Map<UserRow.UserDetails, List<PublicApiUserOrganization>> grouped =
                rows.stream().collect(
                        groupingBy(row -> row.user,
                                mapping(row -> new PublicApiUserOrganization(row.organizationId, row.roles), toList())));

        return grouped.entrySet().stream().map(PublicApiDao::entryToAuthorizationUser).collect(toList());
    }
}

final class UserRow {

    UserDetails user = new UserDetails();
    UUID organizationId;
    List<String> roles;

    @DalesbredInstantiator
    UserRow(String email,
            String firstName,
            String lastName,
            boolean superuser,
            UUID organizationId,
            List<String> roles) {

        this.user.email = email;
        this.user.firstName = firstName;
        this.user.lastName = lastName;
        this.user.superuser = superuser;
        this.organizationId = organizationId;
        this.roles = roles;
    }

    static final class UserDetails {

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
}
