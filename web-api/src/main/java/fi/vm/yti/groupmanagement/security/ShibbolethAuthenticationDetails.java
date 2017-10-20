package fi.vm.yti.groupmanagement.security;

import org.jetbrains.annotations.NotNull;

import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpServletRequest;

import static java.util.Objects.requireNonNull;

final class ShibbolethAuthenticationDetails {

    private final String email;
    private final String firstName;
    private final String lastName;

    ShibbolethAuthenticationDetails(HttpServletRequest request) {
        this.email = getAttributeAsString(request, "mail");
        this.firstName = getAttributeAsString(request, "givenname");
        this.lastName = getAttributeAsString(request, "surname");
    }

    private static String getAttributeAsString(HttpServletRequest request, String attributeName) {

        Object attribute = requireNonNull(request.getAttribute(attributeName), "Request attribute missing: " + attributeName);
        return convertLatinToUTF8(attribute.toString());
    }

    private static @NotNull String convertLatinToUTF8(@NotNull String s) {
        return new String(s.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public String toString() {
        return "ShibbolethAuthenticationDetails{" +
                "email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}