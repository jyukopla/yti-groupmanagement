package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.dao.PublicApiDao;
import fi.vm.yti.groupmanagement.model.PublicApiUser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public-api")
public class PublicApiController {

    private final PublicApiDao authorizationDao;

    public PublicApiController(PublicApiDao authorizationDao) {
        this.authorizationDao = authorizationDao;
    }

    @RequestMapping("/user")
    public PublicApiUser getUser(@RequestParam String email) {
        return authorizationDao.getUser(email);
    }
}
