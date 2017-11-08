package fi.vm.yti.groupmanagement.controller;


import fi.vm.yti.groupmanagement.dao.UserRequestDao;
import fi.vm.yti.groupmanagement.model.UserRequest;
import fi.vm.yti.groupmanagement.model.UserRequestModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api/request")
class UserRequestController {
    private final UserRequestDao userRequestDao;

    @Autowired
    UserRequestController(UserRequestDao userRequestDao) {
        this.userRequestDao = userRequestDao;
    }

    @RequestMapping(value = "{request}", method = PUT, consumes = APPLICATION_JSON_VALUE)
    public void setUser(@RequestBody UserRequestModel request) {
        this.userRequestDao.setUserRequest(request);
    }

    @RequestMapping(value = "/get/{id}", method = GET)
    public List<UserRequest> getUserRequests(@PathVariable("id") UUID organizationId) {
        return this.userRequestDao.getUserRequests(organizationId);
    }

    @RequestMapping(value = "/delete/{id}", method = PUT)
    public void deleteUserRequest(@PathVariable Integer id) {
        this.userRequestDao.deleteUserRequest(id);
    }
}
