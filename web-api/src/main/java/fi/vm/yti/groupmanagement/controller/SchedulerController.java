package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.model.UserRequestWithOrganization;
import fi.vm.yti.groupmanagement.service.FrontendService;
import fi.vm.yti.groupmanagement.service.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
public class SchedulerController {
    private final FrontendService frontendService;
    private final SchedulerService schedulerService;

    private List<UserRequestWithOrganization> requests;

    @Autowired
    public SchedulerController(FrontendService frontendService,
                               SchedulerService schedulerService) {
        this.frontendService = frontendService;
        this.schedulerService = schedulerService;
    }

    //@Scheduled(cron = "0/59 * * * * *") //For testing
    @Scheduled(cron = "0 0 0 1/1 * ?")
    public void getNewAccessRequests() {
        System.out.println("Scheduled job started");
        this.requests = frontendService.getUnsentRequests();
        if (this.requests.size() > 0)
                processAccessRequests(requests);
    }

    public void processAccessRequests(List<UserRequestWithOrganization> requests) {
        //Remove duplicate organizationIds
        List<UserRequestWithOrganization> tempList = new ArrayList<>();
        UUID previousId = null;
        AdminEmail adminEmail = new AdminEmail();

        for(UserRequestWithOrganization request: requests) {
            Boolean res = false;
            if (previousId == request.organizationId || tempList.size() < 1) {
                tempList.add(request);
                if (tempList.size() == requests.size()) {
                    adminEmail.adminEmails = this.frontendService.getOrganizationAdminEmails(previousId);
                    adminEmail.requestCount = (tempList.size() > 0) ? tempList.size() : 0;
                    adminEmail.organizationName_fi = request.organizationName.get("fi");
                    adminEmail.organizationName_en = request.organizationName.get("en");
                    adminEmail.organizationName_sv = request.organizationName.get("sv");
                    try {
                        res = this.schedulerService.sendAccessRequestEmail(adminEmail.adminEmails, adminEmail.requestCount, adminEmail.organizationName_fi);
                        if (res)
                            frontendService.setRequestAsSent(request.id);

                    }
                    catch (InterruptedException | MailException ex) {
                        System.out.printf("Exception while sending access request email to administrator: %s\n", ex);
                    }
                }
            }

            else {
                adminEmail.adminEmails = this.frontendService.getOrganizationAdminEmails(previousId);
                adminEmail.requestCount = (tempList.size() > 0) ? tempList.size() : 0;
                adminEmail.organizationName_fi = request.organizationName.get("fi");
                adminEmail.organizationName_en = request.organizationName.get("en");
                adminEmail.organizationName_sv = request.organizationName.get("sv");
                try {
                    res =  this.schedulerService.sendAccessRequestEmail(adminEmail.adminEmails, adminEmail.requestCount, adminEmail.organizationName_fi);
                        if (res)
                            frontendService.setRequestAsSent(request.id);
                }
                catch (InterruptedException | MailException ex) {
                    System.out.printf("Exception while sending access request email(s) to administrator(s): %s\n", ex);
                }
            }
            previousId = request.organizationId;
        }
    }

    public class AdminEmail {
        List<String> adminEmails;
        int requestCount;
        String organizationName_fi;
        String organizationName_en;
        String organizationName_sv;
    }
}
