package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.TestInfo;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TestDao {

    private final Database database;

    @Autowired
    public TestDao(Database database) {
        this.database = database;
    }

    public TestInfo getTest() {
        return database.findUnique(TestInfo.class, "SELECT t.id, t.name FROM test t WHERE t.id = ?", 1);
    }
}
