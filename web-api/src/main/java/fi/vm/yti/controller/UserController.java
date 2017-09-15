package fi.vm.yti.controller;


import fi.vm.yti.dao.UserDao;
import fi.vm.yti.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api/users")
class UserController {

    private final UserDao userDao;

    @Autowired
    UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @RequestMapping(value = "", method = GET, produces = APPLICATION_JSON_VALUE)

    public List<UserModel> getUsers() {
        return this.userDao.getUsers();
    }
}
