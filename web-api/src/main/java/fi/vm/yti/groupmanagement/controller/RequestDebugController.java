package fi.vm.yti.groupmanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

@RestController
@RequestMapping(value = "/api/debug", method = RequestMethod.GET)
public class RequestDebugController {

    @RequestMapping
    String debug(HttpServletRequest request, HttpServletResponse response) {

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        Enumeration<String> attributeNames = request.getAttributeNames();

        StringBuilder result = new StringBuilder();

        result.append(formatKeyAndValue(request, "Shib-Identity-Provider"));
        result.append(formatKeyAndValue(request, "displayName"));
        result.append(formatKeyAndValue(request, "group"));
        result.append(formatKeyAndValue(request, "mail"));
        result.append(formatKeyAndValue(request, "sn"));
        result.append(formatKeyAndValue(request, "uid"));

        while (attributeNames.hasMoreElements()) {
            result.append(formatKeyAndValue(request, attributeNames.nextElement()));
        }

        return result.toString();
    }


    private String formatKeyAndValue(HttpServletRequest req, String key) {
        return key + ":" + req.getAttribute(key) + "\n";
    }
}
