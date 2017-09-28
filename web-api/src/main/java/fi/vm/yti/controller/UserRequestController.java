package fi.vm.yti.controller;


import fi.vm.yti.dao.UserRequestDao;
import fi.vm.yti.model.UserRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

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
}
