package fi.vm.yti.groupmanagement.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

import static java.util.Collections.unmodifiableList;
import static org.springframework.security.core.authority.AuthorityUtils.createAuthorityList;

public class YtiGroupManagementUserDetails implements UserDetails {

    private static final List<GrantedAuthority> DEFAULT_AUTHORITIES =
            unmodifiableList(createAuthorityList("ROLE_USER"));

    private final String username;
    private final ShibbolethAuthenticationDetails details;

    YtiGroupManagementUserDetails(String username, ShibbolethAuthenticationDetails details) {
        this.username = username;
        this.details = details;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO
        return DEFAULT_AUTHORITIES;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    public String getFirstName() {
        return this.details.getFirstName();
    }

    public String getLastName() {
        return this.details.getLastName();
    }

    public String getEmail() {
        return this.details.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
