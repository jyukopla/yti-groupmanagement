package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.OrganizationListItem;
import fi.vm.yti.groupmanagement.model.OrganizationModel;
import org.dalesbred.Database;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static fi.vm.yti.groupmanagement.util.CollectionUtil.mapToList;

@Repository
public class OrganizationDao {

    private final Database db;

    @Autowired
    public OrganizationDao(Database db) {
        this.db = db;
    }

    public @NotNull List<OrganizationListItem> getOrganizationList() {

        List<OrganizationListItemRow> rows =
                db.findAll(OrganizationListItemRow.class, "SELECT id, name_en, name_fi, name_sv FROM organization");

        return mapToList(rows, row -> new OrganizationListItem(row.id, row.name_fi, row.name_en, row.name_sv));
    }

    public OrganizationModel getOrganization(UUID uuid) {
         return db.findUnique(OrganizationModel.class,"SELECT id, name_en, name_fi, name_sv, url FROM organization where id = ?", uuid);
    }

    public List<OrganizationModel> setOrganization(UUID uuid) {
        return db.findAll(OrganizationModel.class,"SELECT id, name_en, name_fi, name_sv, url FROM organization where id = ?", uuid);
    }

    public OrganizationModel createOrganization(OrganizationModel org) {
        int uuid = db.findUniqueInt("INSERT INTO organization (name_en, name_fi, name_sv, url) VALUES (?,?,?,?) RETURNING id", org.name_en, org.name_fi, org.name_sv, org.url);
        org = db.findUnique(OrganizationModel.class,"SELECT id, name_en, name_fi, name_sv, url FROM organization where id = ?", uuid);
        return org;
    }

    public void updateOrganization(OrganizationModel org) {
        db.update("SELECT id, name_en, name_fi, name_sv, url FROM organization where id = ?", org.id);
        db.update("UPDATE organization (name_en, name_fi, name_sv, url) VALUES (?,?,?,?) WHERE id = ?", org.name_en, org.name_fi, org.name_sv, org.url, org.id);
    }

    private static class OrganizationListItemRow {

        public UUID id;
        public String name_fi;
        public String name_en;
        public String name_sv;
    }
}
