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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping(value = "/user", method = GET, produces = APPLICATION_JSON_VALUE, params = "email")
    public PublicApiUser getUserByEmail(@RequestParam @NotNull String email,
                                        @RequestParam(required = false) @Nullable String firstName,
                                        @RequestParam(required = false) @Nullable String lastName) {
        logger.info("GET /user requested");
        if (email.isEmpty()) {
            throw new RuntimeException("Email is a mandatory parameter");
        }

        if (firstName != null && lastName != null) {
            return this.publicApiService.getOrCreateUser(email, firstName, lastName);
        } else {
            return this.publicApiService.getUserByEmail(email);
        }
    }

    @RequestMapping(value = "/user", method = GET, produces = APPLICATION_JSON_VALUE, params = "id")
    public PublicApiUser findUserById(@RequestParam @NotNull UUID id) {

        logger.info("GET /user requested");

        PublicApiUser user = this.publicApiService.findUserById(id);

        if (user == null) {
            throw new UserNotFoundException(id);
        }

        return user;
    }

    @RequestMapping(value = "/users", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<PublicApiUserListItem> getUsers() {
        logger.info("GET /users requested");
        return this.publicApiService.getUsers();
    }

    @RequestMapping(value = "/organizations", method = GET, produces = APPLICATION_JSON_VALUE)
    @CrossOrigin
    public List<PublicApiOrganization> getOrganizations() {
        logger.info("GET /organizations requested");
        return publicApiService.getOrganizations();
    }

    @RequestMapping(value = "/request", method = POST)
    public void addUserRequest(@RequestParam String email,
                               @RequestParam UUID organizationId,
                               @RequestParam String role) {
        logger.info("POST /request requested for organization id: " + organizationId + " for role: " + role);
        this.publicApiService.addUserRequest(email, organizationId, role);
    }

    @RequestMapping(value = "/requests", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<PublicApiUserRequest> getUserRequests(@RequestParam String email) {
        logger.info("GET requests requested");
        return this.publicApiService.getUserRequests(email);
    }
}
