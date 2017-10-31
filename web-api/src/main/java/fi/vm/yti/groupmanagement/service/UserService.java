package fi.vm.yti.groupmanagement.service;

import fi.vm.yti.groupmanagement.dao.UserDao;
import fi.vm.yti.groupmanagement.model.User;
import fi.vm.yti.groupmanagement.security.AuthorizationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static fi.vm.yti.security.AuthorizationException.check;

@Service
public class UserService {

    private final UserDao userDao;
    private final AuthorizationManager authorizationManager;

    @Autowired
    UserService(UserDao userDao,
                AuthorizationManager authorizationManager) {
        this.userDao = userDao;
        this.authorizationManager = authorizationManager;
    }

    public List<User> getUsers() {
        check(authorizationManager.canBrowseUsers());
        return userDao.getUsers();
    }
}
