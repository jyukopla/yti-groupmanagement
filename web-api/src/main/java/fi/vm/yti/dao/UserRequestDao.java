package fi.vm.yti.dao;

import fi.vm.yti.model.UserRequestModel;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


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
}
