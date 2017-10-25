package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.User;
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

    public List<User> getUsers() {
        return db.findAll(User.class,"SELECT firstName, lastName, email, superuser FROM \"user\"");
    }
}
