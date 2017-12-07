package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.model.*;
import fi.vm.yti.groupmanagement.service.FrontendService;
import fi.vm.yti.security.AuthenticatedUserProvider;
import fi.vm.yti.security.YtiUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api")
public class FrontendController {

    private final FrontendService frontendService;
    private final AuthenticatedUserProvider userProvider;

    @Autowired
    public FrontendController(FrontendService frontendService,
                              AuthenticatedUserProvider userProvider) {
        this.frontendService = frontendService;
        this.userProvider = userProvider;
    }

    @RequestMapping(value = "/authenticated-user", method = GET, produces = APPLICATION_JSON_VALUE)
    public YtiUser getAuthenticatedUser() {
        return userProvider.getUser();
    }
    
    @RequestMapping(value = "/organizations", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<OrganizationListItem> getOrganizations() {
        return this.frontendService.getOrganizationList();
    }

    @RequestMapping(value = "/organization/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
    public OrganizationWithUsers getOrganization(@PathVariable("id") UUID id) {
        return this.frontendService.getOrganization(id);
    }

    @RequestMapping(value = "/organization", method = POST, produces = APPLICATION_JSON_VALUE)
    public UUID createOrganization(@RequestBody CreateOrganization createOrganization) {
        return this.frontendService.createOrganization(createOrganization);
    }

    @RequestMapping(value = "/organization", method = PUT, produces = APPLICATION_JSON_VALUE)
    public void updateOrganization(@RequestBody UpdateOrganization updateOrganization) {
        this.frontendService.updateOrganization(updateOrganization);
    }

    @RequestMapping(value = "/roles", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<String> getAllRoles() {
        return this.frontendService.getAllRoles();
    }

    @RequestMapping(value = "/users", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<UserWithRolesInOrganizations> getUsers() {
        return this.frontendService.getUsers();
    }

    @RequestMapping(value = "/requests", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<UserRequestWithOrganization> getAllUserRequests() {
        return this.frontendService.getAllUserRequests();
    }

    @RequestMapping(value = "/request", method = POST, consumes = APPLICATION_JSON_VALUE)
    public void addUserRequest(@RequestBody UserRequestModel request) {
        this.frontendService.addUserRequest(request);
    }

    @RequestMapping(value = "/request/{id}", method = DELETE)
    public void declineUserRequest(@PathVariable("id") int id) {
        this.frontendService.declineUserRequest(id);
    }

    @RequestMapping(value = "/request/{id}", method = POST)
    public void acceptUserRequest(@PathVariable("id") int id) {
        this.frontendService.acceptUserRequest(id);
    }
}
