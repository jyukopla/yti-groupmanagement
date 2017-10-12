package fi.vm.yti.groupmanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

@RestController
public class RequestDebugController {

    @RequestMapping(value = "/debug", method = RequestMethod.GET)
    String debug(HttpServletRequest request, HttpServletResponse response) {

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        Enumeration<String> attributeNames = request.getAttributeNames();

        StringBuilder result = new StringBuilder();

        while (attributeNames.hasMoreElements()) {
            String attributeName = attributeNames.nextElement();
            Object attributeValue = request.getAttribute(attributeName);

            result.append(attributeName).append(":").append(attributeValue).append("\n");
        }

        return result.toString();
    }
}
