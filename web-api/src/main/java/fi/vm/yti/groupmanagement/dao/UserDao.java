package fi.vm.yti.groupmanagement.dao;


import fi.vm.yti.groupmanagement.model.UserModel;
import org.springframework.stereotype.Repository;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Repository
public class UserDao {
    private final Database db;

    @Autowired
    public UserDao(Database db) {
        this.db = db;
    }

    public List<UserModel> getUsers() {
        return db.findAll(UserModel.class,"SELECT firstName, lastName, email, superuser FROM \"user\"");
    }

    //TODO or to remove
    /*public List<UserModel> getUsersForOrganization() {
        return db.findAll(UserModel.class,"SELECT name, email, superuser FROM \"user\"");
    }*/

    public void setUser(UserModel user) {
        db.update("INSERT INTO \"user\" (email, firstName, lastName, superuser) VALUES (?,?,?,?)", user.email, user.firstName, user.lastName, user.superuser);
    }
}
