package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.config.ApplicationProperties;
import fi.vm.yti.groupmanagement.config.ImpersonateProperties;
import fi.vm.yti.groupmanagement.model.*;
import fi.vm.yti.groupmanagement.service.FrontendService;
import fi.vm.yti.security.AuthenticatedUserProvider;
import fi.vm.yti.security.YtiUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@RequestMapping("/api")
public class FrontendController {


    private final FrontendService frontendService;
    private final AuthenticatedUserProvider userProvider;
    private final ApplicationProperties applicationProperties;
    private final ImpersonateProperties impersonateProperties;

    private static final Logger logger = LoggerFactory.getLogger(FrontendController.class);

    @Autowired
    public FrontendController(FrontendService frontendService,
                              AuthenticatedUserProvider userProvider,
                              ApplicationProperties applicationProperties,
                              ImpersonateProperties impersonateProperties) {
        this.frontendService = frontendService;
        this.userProvider = userProvider;
        this.applicationProperties = applicationProperties;
        this.impersonateProperties = impersonateProperties;
    }

    @RequestMapping(value = "/authenticated-user", method = GET, produces = APPLICATION_JSON_VALUE)
    public YtiUser getAuthenticatedUser() {
        logger.info("getAuthenticatedUser requested");
        return userProvider.getUser();
    }
    
    @RequestMapping(value = "/organizations/{showRemoved}", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<OrganizationListItem> getOrganizationsOpt(@PathVariable("showRemoved") Boolean showRemoved) {
        logger.info("getOrganizations/{showRemoved} requested");
        return this.frontendService.getOrganizationListOpt(showRemoved);
    }

    @RequestMapping(value = "/organizations", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<OrganizationListItem> getOrganizations() {
        logger.info("getOrganizations requested");
        return this.frontendService.getOrganizationList();
    }

    @RequestMapping(value = "/organization/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
    public OrganizationWithUsers getOrganization(@PathVariable("id") UUID id) {
        logger.info("getOrganization requested with id: " + id.toString());
        return this.frontendService.getOrganization(id);
    }

    @RequestMapping(value = "/organization", method = POST, produces = APPLICATION_JSON_VALUE)
    public UUID createOrganization(@RequestBody CreateOrganization createOrganization) {
        logger.info("createOrganization requested with descriptionFI: " + createOrganization.descriptionFi + ", " +
                "nameFI: " + createOrganization.nameFi + " and adminUserEmails: {}", createOrganization.adminUserEmails.toString());
        return this.frontendService.createOrganization(createOrganization);
    }

    @RequestMapping(value = "/organization", method = PUT, produces = APPLICATION_JSON_VALUE)
    public void updateOrganization(@RequestBody UpdateOrganization updateOrganization) {
        List<EmailRole> userRoles = updateOrganization.userRoles;
        List<String> emailRoles = new ArrayList<>();
        for(EmailRole item : userRoles) { emailRoles.add(new String(item.userEmail +": " + item.role));}
        logger.info("updateOrganization requested with id: " + updateOrganization.organization.id + " , nameFI: " + updateOrganization.organization.nameFi + ", userRoles: {}", emailRoles);
        this.frontendService.updateOrganization(updateOrganization);
    }

    @RequestMapping(value = "/roles", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<String> getAllRoles() {
        logger.info("getAllRoles requested");
        return this.frontendService.getAllRoles();
    }

    @RequestMapping(value = "/usersForOwnOrganizations", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<UserWithRolesInOrganizations> getUsersForOwnOrganizations() {
        logger.info("getUsersForOwnOrganizations requested");
        return this.frontendService.getUsersForOwnOrganizations();
    }

    @RequestMapping(value = "/users", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<UserWithRolesInOrganizations> getUsers() {
        logger.info("getUsers requested");
        return this.frontendService.getUsers();
    }

    @RequestMapping(value = "/removeuser/{email}/", method = POST)
    public Boolean removeUser(@PathVariable("email") String email) {
        logger.info("removeUser requested for email: " + email);
        this.frontendService.removeUser(email);
        return true;
    }

    @RequestMapping(value = "/requests", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<UserRequestWithOrganization> getAllUserRequests() {
        logger.info("getAllUserRequests requested");
        return this.frontendService.getAllUserRequests();
    }

    @RequestMapping(value = "/request", method = POST, consumes = APPLICATION_JSON_VALUE)
    public void addUserRequest(@RequestBody UserRequestModel request) {
        logger.info("addUserRequest requested for email: " + request.email + ", role: " + request.role + " for organization id: " + request.organizationId);
        this.frontendService.addUserRequest(request);
    }

    @RequestMapping(value = "/request/{id}", method = DELETE)
    public void declineUserRequest(@PathVariable("id") int id) {
        logger.info("declineUserRequest requested with request id: " + id);
        this.frontendService.declineUserRequest(id);
    }

    @RequestMapping(value = "/request/{id}", method = POST)
    public void acceptUserRequest(@PathVariable("id") int id) {
        logger.info("acceptUserRequest requested with request id: " + id);
        this.frontendService.acceptUserRequest(id);
    }

    @RequestMapping(value = "/configuration", method = GET, produces = APPLICATION_JSON_VALUE)
    public ConfigurationModel getConfiguration() {
        logger.info("getConfiguration requested");

        ConfigurationModel model = new ConfigurationModel();
        model.codeListUrl = this.applicationProperties.getCodeListUrl();
        model.dataModelUrl = this.applicationProperties.getDataModelUrl();
        model.terminologyUrl = this.applicationProperties.getTerminologyUrl();
        model.dev = this.applicationProperties.getDevMode();
        model.env = this.applicationProperties.getEnv();
        model.fakeLoginAllowed =  this.applicationProperties.isFakeLoginAllowed();
        model.impersonateAllowed = impersonateProperties.isAllowed();

        return model;
    }
}
