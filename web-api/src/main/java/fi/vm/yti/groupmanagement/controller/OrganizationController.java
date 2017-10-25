package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.dao.OrganizationDao;
import fi.vm.yti.groupmanagement.model.OrganizationListItem;
import fi.vm.yti.groupmanagement.model.OrganizationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.MediaType.ALL_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@RequestMapping("/api")
class OrganizationController {

    private final OrganizationDao organizationDao;

    @Autowired
    OrganizationController(OrganizationDao organizationDao) {
        this.organizationDao = organizationDao;
    }

    @RequestMapping(value = "/organizations", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<OrganizationListItem> getOrganizations() {
        return this.organizationDao.getOrganizationList();
    }

    @RequestMapping(value = "/organizations/{id}", method = GET, produces = APPLICATION_JSON_VALUE)
    public OrganizationModel getOrganization(@PathVariable("id") UUID id)
         {return this.organizationDao.getOrganization(id);}

    @RequestMapping(value = "/organizations/{org}", method = PUT, consumes = ALL_VALUE, produces = APPLICATION_JSON_VALUE)
    public OrganizationModel createOrganization(@PathVariable("org") OrganizationModel org) {
        return this.organizationDao.createOrganization(org);
    }

    @RequestMapping(value = "/organizations/organization/{org}", method = POST, consumes = APPLICATION_JSON_VALUE)
    public void updateOrganization(@RequestBody OrganizationModel org) {
        this.organizationDao.updateOrganization(org);
    }
}