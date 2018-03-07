package fi.vm.yti.groupmanagement.service;

import fi.vm.yti.groupmanagement.dao.PublicApiDao;
import fi.vm.yti.groupmanagement.model.PublicApiOrganization;
import fi.vm.yti.groupmanagement.model.PublicApiUser;
import fi.vm.yti.groupmanagement.model.PublicApiUserListItem;
import fi.vm.yti.groupmanagement.model.PublicApiUserRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

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
            UUID id = UUID.randomUUID();
            return publicApiDao.createUser(email, firstName, lastName, id);
        }
    }

    @Transactional
    public List<PublicApiOrganization> getOrganizations() {
        return publicApiDao.getOrganizations();
    }

    @Transactional
    public void addUserRequest(String email, UUID organizationId, String role) {
        publicApiDao.addUserRequest(email, organizationId, role);
    }

    @Transactional
    public List<PublicApiUserRequest> getUserRequests(String email) {
        return this.publicApiDao.getUserRequests(email);
    }

    @Transactional
    public List<PublicApiUserListItem> getUsers() {
        return this.publicApiDao.getUsers();
    }
}
