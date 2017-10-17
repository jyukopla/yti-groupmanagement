package fi.vm.yti.groupmanagement.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

@Controller
public class ShibbolethErrorController {

    @Value("${registration.url}")
    private String registrationUrl;

    @RequestMapping(value = "/login-error", method = RequestMethod.GET)
    String loginError(@RequestParam(required = false) String now,
                      @RequestParam(required = false) String requestURL,
                      @RequestParam(required = false) String errorType,
                      @RequestParam(required = false) String errorText,
                      @RequestParam(name = "RelayState", required = false) String relayState,
                      @RequestParam(required = false) String entityID,
                      @RequestParam(required = false) String statusCode,
                      @RequestParam(required = false) String statusCode2,
                      Map<String, Object> model) {

        model.put("missingSignUp", isSingUpMissing(errorType, statusCode2));
        model.put("registrationUrl", registrationUrl + "?returnUrl=" + urlEncode(relayState));
        model.put("goBackUrl", urlEncode(relayState));

        model.put("now", now);
        model.put("requestURL", requestURL);
        model.put("errorType", errorType);
        model.put("errorText", errorText);
        model.put("relayState", relayState);
        model.put("entityID", entityID);
        model.put("statusCode", statusCode);
        model.put("statusCode2", statusCode2);

        return "loginError";
    }

    private static String urlEncode(String s) {
        try {
            return URLEncoder.encode(s, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    private static boolean isSingUpMissing(String errorType, String statusCode2) {
        return "opensaml::FatalProfileException".equals(errorType) &&
                "urn:oasis:names:tc:SAML:2.0:status:RequestDenied".equals(statusCode2);
    }
}
