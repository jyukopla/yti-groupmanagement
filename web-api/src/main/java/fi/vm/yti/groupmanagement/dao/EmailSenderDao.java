package fi.vm.yti.groupmanagement.dao;

import fi.vm.yti.groupmanagement.model.UnsentRequestsForOrganization;
import org.dalesbred.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class EmailSenderDao {

    private final Database database;

    @Autowired
    public EmailSenderDao(Database database) {
        this.database = database;
    }

    public List<UnsentRequestsForOrganization> getUnsentRequests() {
        return database.findAll(UnsentRequestsForOrganization.class,
                "WITH unsent_requests_in_organizations AS (\n" +
                        "    SELECT\n" +
                        "      org.id,\n" +
                        "      org.name_fi,\n" +
                        "      org.name_en,\n" +
                        "      org.name_sv,\n" +
                        "      count(r.id) AS request_count\n" +
                        "    FROM request r\n" +
                        "      LEFT JOIN organization org ON (org.id = r.organization_id)\n" +
                        "    WHERE r.sent = FALSE\n" +
                        "    GROUP BY org.id, org.name_fi, org.name_en, org.name_sv\n" +
                        ")\n" +
                        "SELECT uro.id, uro.name_fi, uro.name_en, uro.name_sv, array_agg(uo.user_email) as admin_emails, uro.request_count\n" +
                        "FROM unsent_requests_in_organizations uro\n" +
                        "  LEFT JOIN user_organization uo ON (uo.organization_id = uro.id)\n" +
                        "WHERE uo.role_name = 'ADMIN'\n" +
                        "GROUP BY uro.id, uro.name_fi, uro.name_en, uro.name_sv, uro.request_count");
    }

    public void markRequestAsSentForOrganization(UUID organizationId) {
        database.update("UPDATE request SET sent='true' WHERE organization_id = ?", organizationId);
    }
}
