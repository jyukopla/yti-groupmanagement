package fi.vm.yti.groupmanagement.service;

import fi.vm.yti.groupmanagement.dao.PublicApiDao;
import fi.vm.yti.groupmanagement.model.PublicApiUser;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PublicApiService {

    private final PublicApiDao publicApiDao;

    @Autowired
    public PublicApiService(PublicApiDao publicApiDao) {
        this.publicApiDao = publicApiDao;
    }

    @Transactional
    public @NotNull PublicApiUser getUser(@NotNull String email) {
        return this.publicApiDao.getUser(email);
    }

    @Transactional
    public @NotNull PublicApiUser getOrCreateUser(@NotNull String email, @NotNull String firstName, @NotNull String lastName) {

        PublicApiUser user = publicApiDao.findUser(email);

        if (user != null) {
            return user;
        } else {
            return publicApiDao.createUser(email, firstName, lastName);
        }
    }
}
