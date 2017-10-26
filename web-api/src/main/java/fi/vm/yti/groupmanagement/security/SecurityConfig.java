package fi.vm.yti.groupmanagement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.authentication.preauth.RequestAttributeAuthenticationFilter;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> authenticatedUserDetailsService() {
        return token -> {
            // TODO actual user roles in organizations fetching
            String username = (String) token.getPrincipal();
            ShibbolethAuthenticationDetails details = (ShibbolethAuthenticationDetails) token.getDetails();
            return new YtiGroupManagementUserDetails(username, details);
        };
    }

    @Bean
    AuthenticationDetailsSource<HttpServletRequest, ShibbolethAuthenticationDetails> authenticationDetailsSource() {
        return ShibbolethAuthenticationDetails::new;
    }

    @Bean
    public Filter authenticationFilter() throws Exception {

        RequestAttributeAuthenticationFilter authenticationFilter = new RequestAttributeAuthenticationFilter();
        authenticationFilter.setPrincipalEnvironmentVariable("mail");
        authenticationFilter.setExceptionIfVariableMissing(false);
        authenticationFilter.setAuthenticationDetailsSource(authenticationDetailsSource());
        authenticationFilter.setAuthenticationManager(authenticationManager());
        return authenticationFilter;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        PreAuthenticatedAuthenticationProvider authenticationProvider = new PreAuthenticatedAuthenticationProvider();
        authenticationProvider.setPreAuthenticatedUserDetailsService(authenticatedUserDetailsService());
        return authenticationProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**/*").addFilter(authenticationFilter());
        http.csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
    }
}
