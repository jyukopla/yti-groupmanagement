
package fi.vm.yti.groupmanagement.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@ConfigurationProperties("application")
@Component
public final class ApplicationProperties {

    public ApplicationProperties applicationProperties() {
        return new ApplicationProperties();
    }

    private String codeListUrl;
    private String dataModelUrl;
    private String terminologyUrl;
    private boolean devMode;

    public String getCodeListUrl() {
        return codeListUrl;
    }

    public void setCodeListUrl(String codeListUrl) {
        this.codeListUrl = codeListUrl;
    }

    public String getDataModelUrl() {
        return dataModelUrl;
    }

    public void setDataModelUrl(String dataModelUrl) {
        this.dataModelUrl = dataModelUrl;
    }

    public String getTerminologyUrl() {
        return terminologyUrl;
    }

    public void setTerminologyUrl(String terminologyUrl) {
        this.terminologyUrl = terminologyUrl;
    }

    public boolean getDevMode() { return this.devMode; }

    public void setDevMode(boolean devMode) { this.devMode = devMode; }

}
