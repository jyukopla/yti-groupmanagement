package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.model.CreateOrganization;
import fi.vm.yti.groupmanagement.model.OrganizationListItem;
import fi.vm.yti.groupmanagement.model.OrganizationWithUsers;
import fi.vm.yti.groupmanagement.model.UpdateOrganization;
import fi.vm.yti.groupmanagement.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@RequestMapping("/api")
class OrganizationController {

    private final OrganizationService organizationService;

    @Autowired
    OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @RequestMapping(value = "/organizations", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<OrganizationListItem> getOrganizations() {
        return this.organizationService.getOrganizationList();
    }

    @RequestMapping(value = "/organization/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
    public OrganizationWithUsers getOrganization(@PathVariable("id") UUID id) {
        return this.organizationService.getOrganization(id);
    }

    @RequestMapping(value = "/organization", method = POST, produces = APPLICATION_JSON_VALUE)
    public UUID createOrganization(@RequestBody CreateOrganization createOrganization) {
        return this.organizationService.createOrganization(createOrganization);
    }

    @RequestMapping(value = "/organization", method = PUT, produces = APPLICATION_JSON_VALUE)
    public void updateOrganization(@RequestBody UpdateOrganization updateOrganization) {
        this.organizationService.updateOrganization(updateOrganization);
    }
}
