package fi.vm.yti.controller;


import fi.vm.yti.dao.OrganizationDao;
import fi.vm.yti.model.OrganizationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/organizations")
class OrganizationController {

    private final OrganizationDao organizationDao;

    @Autowired
    OrganizationController(OrganizationDao organizationDao) {
        this.organizationDao = organizationDao;
    }

    @RequestMapping(value = "", method = GET, produces = APPLICATION_JSON_VALUE)

    public List<OrganizationModel> getOrganizations() {
        return this.organizationDao.getOrganizations();
    }
}
