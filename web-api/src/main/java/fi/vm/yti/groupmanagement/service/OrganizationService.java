package fi.vm.yti.groupmanagement.service;

import fi.vm.yti.groupmanagement.dao.OrganizationDao;
import fi.vm.yti.groupmanagement.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class OrganizationService {

    private final OrganizationDao organizationDao;

    @Autowired
    public OrganizationService(OrganizationDao organizationDao) {
        this.organizationDao = organizationDao;
    }

    @Transactional
    public UUID createOrganization(CreateOrganization createOrganizationModel) {

        UUID id = UUID.randomUUID();

        Organization org = new Organization();
        org.id = id;
        org.url = createOrganizationModel.url;
        org.nameEn = createOrganizationModel.nameEn;
        org.nameFi = createOrganizationModel.nameFi;
        org.nameSv = createOrganizationModel.nameSv;
        org.descriptionEn = createOrganizationModel.descriptionEn;
        org.descriptionFi = createOrganizationModel.descriptionFi;
        org.descriptionSv = createOrganizationModel.descriptionSv;

        organizationDao.createOrganization(org);

        for (String adminUserEmail : createOrganizationModel.adminUserEmails) {
            organizationDao.addUserToRoleInOrganization(adminUserEmail, "ADMIN", id);
        }

        return id;
    }

    @Transactional
    public void updateOrganization(UpdateOrganization updateOrganization) {

        Organization organization = updateOrganization.organization;
        UUID id = organization.id;
        organizationDao.updateOrganization(organization);
        organizationDao.clearUserRoles(id);

        for (EmailRole userRole : updateOrganization.userRoles) {
            organizationDao.addUserToRoleInOrganization(userRole.userEmail, userRole.role, id);
        }
    }

    @Transactional
    public List<OrganizationListItem> getOrganizationList() {
        return this.organizationDao.getOrganizationList();
    }

    @Transactional
    public OrganizationWithUsers getOrganization(UUID organizationId) {

        Organization organizationModel = this.organizationDao.getOrganization(organizationId);
        List<UserWithRoles> users = this.organizationDao.getOrganizationUsers(organizationId);

        OrganizationWithUsers organizationWithUsers = new OrganizationWithUsers();
        organizationWithUsers.organization = organizationModel;
        organizationWithUsers.users = users;

        return organizationWithUsers;
    }
}
