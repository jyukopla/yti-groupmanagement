package fi.vm.yti.groupmanagement.service;

import fi.vm.yti.groupmanagement.dao.OrganizationDao;
import fi.vm.yti.groupmanagement.model.*;
import fi.vm.yti.groupmanagement.security.AuthorizationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static fi.vm.yti.security.AuthorizationException.check;

@Service
public class OrganizationService {

    private final OrganizationDao organizationDao;
    private final AuthorizationManager authorizationManager;

    @Autowired
    public OrganizationService(OrganizationDao organizationDao,
                               AuthorizationManager authorizationManager) {
        this.organizationDao = organizationDao;
        this.authorizationManager = authorizationManager;
    }

    @Transactional
    public UUID createOrganization(CreateOrganization createOrganizationModel) {

        check(authorizationManager.canCreateOrganization());

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

        check(authorizationManager.canEditOrganization(updateOrganization.organization.id));

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
        return authorizationManager.filterViewableOrganizations(organizationDao.getOrganizationList());
    }

    @Transactional
    public OrganizationWithUsers getOrganization(UUID organizationId) {

        check(authorizationManager.canViewOrganization(organizationId));

        Organization organizationModel = this.organizationDao.getOrganization(organizationId);
        List<UserWithRoles> users = this.organizationDao.getOrganizationUsers(organizationId);
        List<String> availableRoles = this.organizationDao.getAvailableRoles();

        OrganizationWithUsers organizationWithUsers = new OrganizationWithUsers();
        organizationWithUsers.organization = organizationModel;
        organizationWithUsers.users = users;
        organizationWithUsers.availableRoles = availableRoles;

        return organizationWithUsers;
    }
}
