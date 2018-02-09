package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.model.PublicApiOrganization;
import fi.vm.yti.groupmanagement.model.PublicApiUser;
import fi.vm.yti.groupmanagement.model.PublicApiUserListItem;
import fi.vm.yti.groupmanagement.model.PublicApiUserRequest;
import fi.vm.yti.groupmanagement.service.PublicApiService;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/public-api")
public class PublicApiController {

    private final PublicApiService publicApiService;
    private static final Logger logger = LoggerFactory.getLogger(PublicApiController.class);

    public PublicApiController(PublicApiService publicApiService) {
        this.publicApiService = publicApiService;
    }

    @RequestMapping(value = "/user", method = GET, produces = APPLICATION_JSON_VALUE)
    public PublicApiUser getUser(@RequestParam @NotNull String email,
                                 @RequestParam(required = false) @Nullable String firstName,
                                 @RequestParam(required = false) @Nullable String lastName) {
        logger.info("getUser requested with email: " + email + ", and name: " + firstName + " " + lastName);
        if (email.isEmpty()) {
            throw new RuntimeException("Email is a mandatory parameter");
        }

        if (firstName != null && lastName != null) {
            return this.publicApiService.getOrCreateUser(email, firstName, lastName);
        } else {
            return this.publicApiService.getUser(email);
        }
    }

    @RequestMapping(value = "/users", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<PublicApiUserListItem> getUsers() {
        logger.info("getUsers requested");
        return this.publicApiService.getUsers();
    }

    @RequestMapping(value = "/organizations", method = GET, produces = APPLICATION_JSON_VALUE)
    @CrossOrigin
    public List<PublicApiOrganization> getOrganizations() {
        logger.info("getOrganizations requested");
        return publicApiService.getOrganizations();
    }

    @RequestMapping(value = "/request", method = POST)
    public void addUserRequest(@RequestParam String email,
                               @RequestParam UUID organizationId,
                               @RequestParam String role) {
        logger.info("addUserRequest requested with email: " + email + " for organization id: " + organizationId + " for role: " + role);
        this.publicApiService.addUserRequest(email, organizationId, role);
    }

    @RequestMapping(value = "/requests", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<PublicApiUserRequest> getUserRequests(@RequestParam String email) {
        logger.info("getUserRequests requested with email: " + email);
        return this.publicApiService.getUserRequests(email);
    }
}
