package fi.vm.yti.groupmanagement.util;

import org.jetbrains.annotations.NotNull;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public final class RequestUtil {

    private RequestUtil() {
    }

    public static @NotNull String createLoginUrl(@NotNull HttpServletRequest request, @NotNull  String url) {
        return getRequestUrlExcludingPath(request) + "/Shibboleth.sso/Login?target=" + urlEncode(url);
    }

    private static @NotNull String getRequestUrlExcludingPath(@NotNull HttpServletRequest req) {

        String scheme = req.getScheme();
        String serverName = req.getServerName();
        int serverPort = req.getServerPort();

        StringBuilder url = new StringBuilder();
        url.append(scheme).append("://").append(serverName);

        if (serverPort != 80 && serverPort != 443) {
            url.append(":").append(serverPort);
        }

        return url.toString();
    }

    private static @NotNull String urlEncode(@NotNull String s) {
        try {
            return URLEncoder.encode(s, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
