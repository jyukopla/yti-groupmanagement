package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.UserOrganization;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.jetbrains.annotations.NotNull;

import java.util.List;


@Repository
public class UserOrganizationDao {

    private final Database db;

    @Autowired
    public UserOrganizationDao(Database db) {
        this.db = db;
    }


    public @NotNull List<UserOrganization> getUserOrganizationList() {

        return db.findAll(UserOrganization.class, "SELECT uo.user_email, us.firstname, us.lastname, org.description_fi, org.description_en, org.description_sv, org.name_fi, org.name_en, org.name_sv, uo.organization_id AS orgids, \n" +
                "uo.role_name AS roles FROM user_organization uo \n" +
                "LEFT JOIN organization org ON (uo.organization_id = org.id) \n" +
                "LEFT JOIN \"user\" us ON (us.email = uo.user_email) \n" +
                "GROUP BY us.firstname, us.lastname, uo.user_email, uo.organization_id, us.email, org.description_fi, org.description_en, org.description_sv, org.name_fi, org.name_en, org.name_sv, uo.role_name\n" +
                "ORDER BY us.lastname;");

    }

    public @NotNull List<String> getAllRoles() {
        return db.findAll(String.class,"SELECT name FROM role");
    }
}

