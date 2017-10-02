package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.OrganizationModel;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class OrganizationDao {

    private final Database db;

    @Autowired
    public OrganizationDao(Database db) {
        this.db = db;
    }

    public List<OrganizationModel> getOrganizations() {
        return db.findAll(OrganizationModel.class,"SELECT id, name_en, name_fi, name_sv, url FROM organization");
    }

    public OrganizationModel getOrganization(UUID uuid) {
         return db.findUnique(OrganizationModel.class,"SELECT id, name_en, name_fi, name_sv, url FROM organization where id = ?", uuid);
    }

    public List<OrganizationModel> setOrganization(UUID uuid) {
        return db.findAll(OrganizationModel.class,"SELECT id, name_en, name_fi, name_sv, url FROM organization where id = ?", uuid);
    }
}