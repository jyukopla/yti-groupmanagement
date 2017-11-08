package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.model.PublicApiOrganization;
import fi.vm.yti.groupmanagement.model.PublicApiUser;
import fi.vm.yti.groupmanagement.service.PublicApiService;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/public-api")
public class PublicApiController {

    private final PublicApiService publicApiService;

    public PublicApiController(PublicApiService publicApiService) {
        this.publicApiService = publicApiService;
    }

    @RequestMapping(value = "/user", method = GET, produces = APPLICATION_JSON_VALUE)
    public PublicApiUser getUser(@RequestParam @NotNull String email,
                                 @RequestParam(required = false) @Nullable String firstName,
                                 @RequestParam(required = false) @Nullable String lastName) {

        if (email.isEmpty()) {
            throw new RuntimeException("Email is a mandatory parameter");
        }

        if (firstName != null && lastName != null) {
            return this.publicApiService.getOrCreateUser(email, firstName, lastName);
        } else {
            return this.publicApiService.getUser(email);
        }
    }

    @RequestMapping(value = "/organizations", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<PublicApiOrganization> getOrganizations() {
        return publicApiService.getOrganizations();
    }
}
