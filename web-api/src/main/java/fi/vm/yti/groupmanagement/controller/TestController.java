package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.dao.TestDao;
import fi.vm.yti.groupmanagement.model.TestInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/api/test")
class TestController {

    private final TestDao testDao;

    @Autowired
    TestController(TestDao testDao) {
        this.testDao = testDao;
    }

    @RequestMapping(value = "", method = GET, produces = APPLICATION_JSON_VALUE)
    public TestInfo getTest() {
        return this.testDao.getTest();
    }
}
