package fi.vm.yti.groupmanagement.task;

import fi.vm.yti.groupmanagement.service.EmailSenderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class UserRequestNotifierTask {

    private static Logger log = LoggerFactory.getLogger(UserRequestNotifierTask.class);

    private final EmailSenderService emailSenderService;

    public UserRequestNotifierTask(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @Scheduled(cron = "0 0/5 * * * ?")
    public void notifyAdmins() {
        log.debug("Scheduled job started");
        this.emailSenderService.sendEmailsToAdmins();
    }
}
