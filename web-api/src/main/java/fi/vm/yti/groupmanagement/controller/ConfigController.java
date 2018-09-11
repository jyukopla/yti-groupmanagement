package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.model.ConfigurationModel;
import fi.vm.yti.groupmanagement.service.ConfigurationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/public-api")
public class ConfigController {

    @Autowired
    private final ConfigurationService configurationService;
    private static final Logger logger = LoggerFactory.getLogger(FrontendController.class);

    @Autowired
    public ConfigController(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }

    @RequestMapping(value = "/configuration", method = GET, produces = APPLICATION_JSON_VALUE)
    public ConfigurationModel getConfiguration() {
        logger.info("getConfiguration requested");
        return this.configurationService.getConfiguration();
    }
}
