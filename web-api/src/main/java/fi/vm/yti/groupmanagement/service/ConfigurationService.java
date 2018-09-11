package fi.vm.yti.groupmanagement.service;

import fi.vm.yti.groupmanagement.config.ApplicationProperties;
import fi.vm.yti.groupmanagement.model.ConfigurationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ConfigurationService {

    private ApplicationProperties properties;
    private ConfigurationModel configurationModel = new ConfigurationModel();

    @Autowired
    public ConfigurationService(ApplicationProperties properties) {
        this.properties = properties.applicationProperties();

        this.configurationModel.codeListUrl = properties.getCodeListUrl();
        this.configurationModel.dataModelUrl = properties.getDataModelUrl();
        this.configurationModel.terminologyUrl = properties.getTerminologyUrl();
    }

    @Transactional
    public ConfigurationModel getConfiguration() {
        return this.configurationModel;
    }
}
