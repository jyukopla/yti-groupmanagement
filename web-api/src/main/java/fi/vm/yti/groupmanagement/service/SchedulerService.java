package fi.vm.yti.groupmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;

import java.util.List;
import java.util.Properties;

@Service
public class SchedulerService {


    @Autowired
    public SchedulerService() {

    }

    @Async
    public Boolean sendAccessRequestEmail(List<String> adminEmails, int requestNumber, String organizationName) throws MailException, InterruptedException {

        boolean success = false;
        try {
            Properties properties = System.getProperties();

            properties.setProperty("mail.smtp.host", "smtp.pouta.csc.fi");
            properties.setProperty("mail.smtp.port", "25");
            properties.setProperty("mail.smtp.auth", "false");

            //TEST google
            /*final String fromEmail = "";
            final String password = "";
            final String toEmail = "";
            properties.setProperty("mail.smtp.host", "smtp.gmail.com");
            properties.setProperty("mail.smtp.port", "587");
            properties.setProperty("mail.smtp.auth", "true");
            properties.setProperty("mail.smtp.starttls.enable", "true");
            Authenticator auth = new Authenticator() {
                //override the getPasswordAuthentication method
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(fromEmail, password);
                }
            };
            */
            //TEST google

            Session session = Session.getInstance(properties);

            //Test google
            //Session session = Session.getInstance(properties, auth);
            //Test google

            MimeMessage mail = new MimeMessage(session);
            InternetAddress[] recipients = new InternetAddress[adminEmails.size()];

            for (int i = 0; i < adminEmails.size(); i++) {
                recipients[i] = new InternetAddress(adminEmails.get(i));
            }

            //mail.addRecipient(Message.RecipientType.TO, new InternetAddress(""));
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
