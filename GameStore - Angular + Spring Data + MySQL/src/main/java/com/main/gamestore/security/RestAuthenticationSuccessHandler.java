package com.main.gamestore.security;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.osgi.service.component.annotations.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.main.gamestore.enumerations.UserRole;

@Component
public class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        		
    	User user = (User) authentication.getPrincipal();
    	com.main.gamestore.models.User sendUser = new com.main.gamestore.models.User();
    	sendUser.setUsername(user.getUsername());

    	Collection<GrantedAuthority> arr = user.getAuthorities();
    	GrantedAuthority authority = arr.iterator().next();
    	String role = authority.getAuthority().substring(5);

    	sendUser.setRole(UserRole.valueOf(role));
    	System.err.println("REST");
        SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, sendUser);
    }

}
