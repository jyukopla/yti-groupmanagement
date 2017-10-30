package fi.vm.yti.groupmanagement.security;

import fi.vm.yti.security.UserProvider;
import fi.vm.yti.security.YtiUser;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationManager {

    private final UserProvider userProvider;

    @Autowired
    AuthorizationManager(UserProvider userProvider) {
        this.userProvider = userProvider;
    }

    public boolean canShowAuthenticationDetails() {
        return isLoggedIn();
    }

    private boolean isLoggedIn() {
        return getUser() != null;
    }

    private @Nullable YtiUser getUser() {
        return userProvider.getUser();
    }
}
