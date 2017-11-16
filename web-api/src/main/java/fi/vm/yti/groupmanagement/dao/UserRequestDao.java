package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.UserRequest;
import fi.vm.yti.groupmanagement.model.UserRequestModel;
import fi.vm.yti.groupmanagement.model.UserRequestWithOrganization;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public class UserRequestDao {
    private final Database db;

    @Autowired
    public UserRequestDao(Database db) {
        this.db = db;
    }

    public void setUserRequest(UserRequestModel userRequest) {
        db.update("INSERT INTO request (user_email, organization_id) VALUES (?,?)", userRequest.email, userRequest.uuid);
    }

    public List<UserRequest> getUserRequests(UUID organizationId) {
        return db.findAll(UserRequest.class, "SELECT id, user_email, organization_id, role_name, sent FROM request WHERE organization_id=?", organizationId);
    }

    public List<UserRequestWithOrganization> getAllUserRequests() {
        return db.findAll(UserRequestWithOrganization.class, "SELECT r.id, r.user_email, r.organization_id, r.role_name, us.firstName, us.lastName, org.name_fi, org.name_en, org.name_sv, r.sent FROM request r\n" +
                "LEFT JOIN \"user\" us ON (us.email = r.user_email)\n" +
                "LEFT JOIN organization org ON (org.id = r.organization_id)");
    }

    public void deleteUserRequest(Integer requestId) {
        db.update("DELETE FROM request WHERE id=?", requestId);

    }
}

