package fi.vm.yti.groupmanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/debug", method = RequestMethod.GET)
public class RequestDebugController {

    @RequestMapping
    String debug(HttpServletRequest request, HttpServletResponse response) {

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        return formatKeysAndValues(request, Arrays.asList(
                "Shib-Identity-Provider",
                "uid",
                "mail",
                "givenname",
                "surname",
                "o",
                "group"
        ));
    }


    private String formatKeysAndValues(HttpServletRequest req, List<String> keys) {
        return keys.stream().map(key -> key + ":" + req.getAttribute(key)).collect(Collectors.joining("\n"));
    }
}
