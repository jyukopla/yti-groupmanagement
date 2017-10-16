package fi.vm.yti.groupmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class ShibbolethErrorController {

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
}
