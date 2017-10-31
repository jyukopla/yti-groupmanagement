package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.model.AuthenticatedUser;
import fi.vm.yti.security.AuthenticatedUserProvider;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    private final AuthenticatedUserProvider userProvider;

    AuthenticationController(AuthenticatedUserProvider userProvider) {
        this.userProvider = userProvider;
    }

    @RequestMapping(value = "/authenticated-user", method = GET, produces = APPLICATION_JSON_VALUE)
    public AuthenticatedUser getAuthenticatedUser() {
        return new AuthenticatedUser(userProvider.getUser());
    }
}
