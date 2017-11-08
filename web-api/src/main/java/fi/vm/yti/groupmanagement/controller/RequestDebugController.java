package fi.vm.yti.groupmanagement.controller;

import fi.vm.yti.groupmanagement.security.AuthorizationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static fi.vm.yti.security.AuthorizationException.check;
import static org.springframework.http.MediaType.TEXT_PLAIN_VALUE;

@RestController
@RequestMapping(value = "/debug", method = RequestMethod.GET, produces = TEXT_PLAIN_VALUE)
public class RequestDebugController {

    private final AuthorizationManager authorizationManager;

    @Autowired
    RequestDebugController(AuthorizationManager authorizationManager) {
        this.authorizationManager = authorizationManager;
    }

    @RequestMapping
    String debug(HttpServletRequest request, HttpServletResponse response) {

        check(authorizationManager.canShowAuthenticationDetails());

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        return formatKeysAndValues(request, Arrays.asList(
                "REMOTE_USER",
                "eppn",
                "targeted-id",
                "persistent-id",
                "Shib-Identity-Provider",
                "uid",
                "mail",
                "givenname",
                "surname",
                "o",
                "group"
        ));
    }


    private String convertLatinToUTF8(Object o) {
        if (o != null) {
            return new String(o.toString().getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
        } else {
            return null;
        }
    }

    private String formatKeysAndValues(HttpServletRequest req, List<String> keys) {
        return keys.stream().map(key -> key + ":" + convertLatinToUTF8(req.getAttribute(key))).collect(Collectors.joining("\n"));
    }
}
