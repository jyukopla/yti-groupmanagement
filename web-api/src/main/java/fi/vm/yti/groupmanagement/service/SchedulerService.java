package fi.vm.yti.groupmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;

import java.util.List;
import java.util.Properties;

@Service
//@PropertySource("classpath:application.properties")
public class SchedulerService {
    @Value("${mail.smtp.host}")
    String host;
    @Value("${mail.smtp.port}")
    String port;
    @Value("${mail.smtp.auth}")
    String auth;


    @Autowired
    public SchedulerService() {

    }

    @Async
    public Boolean sendAccessRequestEmail(List<String> adminEmails, int requestNumber, String organizationName) throws MailException, InterruptedException {

        boolean success = false;
        try {
            Properties properties = System.getProperties();

            properties.setProperty("mail.smtp.host", host);
            properties.setProperty("mail.smtp.port", port);
            properties.setProperty("mail.smtp.auth", auth);

            Session session = Session.getInstance(properties);

            MimeMessage mail = new MimeMessage(session);
            InternetAddress[] recipients = new InternetAddress[adminEmails.size()];

            for (int i = 0; i < adminEmails.size(); i++) {
                recipients[i] = new InternetAddress(adminEmails.get(i));
            }

            mail.addRecipients(Message.RecipientType.TO, recipients);
            mail.setFrom(new InternetAddress("no.reply@vrk.fi"));
            mail.setSubject("New access request waiting");
            //String message= "You have " + requestNumber + " new access request(s) to "+ organizationName + " \n\n" + "https://rhp-dev.suomi.fi/";
            String message = "Sinulle on " + requestNumber + " uutta käyttöoikeuspyyntöä organisaatioon '" + organizationName + "':   " + "https://rhp-dev.suomi.fi/";
            mail.setContent(message, "text/html");
            mail.setSender(new InternetAddress("no.reply@vrk.fi"));

            try {
                Transport.send(mail);
                success = true;
            } catch (MessagingException ex) {
                System.out.println("Sending mail failed");
                System.out.println(ex);
            }
            return success;

        } catch (Exception ex) {
            System.out.println("Exception in SchedulerService");
            System.out.println(ex.getMessage());
            System.out.println(ex);
        }
        return success;

    }
}
