package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.dao.UserOrganizationDao;
import fi.vm.yti.groupmanagement.model.UserOrganization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/api")
public class UserOrganizationController {

    private final UserOrganizationDao userOrganizationDao;

    @Autowired
    UserOrganizationController(UserOrganizationDao userOrganizationDao) {
        this.userOrganizationDao = userOrganizationDao;
    }

    @RequestMapping(value = "/userorganizations", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<UserOrganization> getUserOrganizations() {
        return this.userOrganizationDao.getUserOrganizationList();
    }

    @RequestMapping(value = "/roles", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<String> getAllRoles() {
        return this.userOrganizationDao.getAllRoles();
    }
}
