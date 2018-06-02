package com.ticketstore.server.configurations.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;

@Component
public class JWTGenerator {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    @Autowired
    public JWTGenerator(AuthenticationManager authenticationManager, TokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public String generateJWTToken(String username, String password, HttpServletResponse response, Boolean isRememberMe) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        boolean rememberMe = (isRememberMe == null) ? false : isRememberMe;

        String jwt = tokenProvider.createToken(authentication, rememberMe);

        response.addHeader(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new JWTToken(jwt).getAuthToken();
    }
}
