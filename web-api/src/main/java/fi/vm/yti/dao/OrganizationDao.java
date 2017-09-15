package fi.vm.yti.dao;

import fi.vm.yti.model.OrganizationModel;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrganizationDao {

    private final Database db;

    @Autowired
    public OrganizationDao(Database db) {
        this.db = db;
    }

    public List<OrganizationModel> getOrganizations() {
        return db.findAll(OrganizationModel.class,"SELECT name_en, name_fi, name_sv, url FROM organization");
    }
}