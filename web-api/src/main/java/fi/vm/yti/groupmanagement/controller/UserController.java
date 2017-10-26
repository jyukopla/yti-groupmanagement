package fi.vm.yti.groupmanagement.controller;


import fi.vm.yti.groupmanagement.dao.UserDao;
import fi.vm.yti.groupmanagement.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@RequestMapping("/api/user")
class UserController {

    private final UserDao userDao;

    @Autowired
    UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @RequestMapping(value = "", method = GET, produces = APPLICATION_JSON_VALUE)
    public List<User> getUsers() {
        return this.userDao.getUsers();
    }
}
