package com.main.gamestore.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.osgi.service.component.annotations.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.main.gamestore.models.view.UserViewModel;
import com.main.gamestore.security.jwt.JWTConfigurer;
import com.main.gamestore.security.jwt.JWTToken;
import com.main.gamestore.security.jwt.TokenProvider;
import com.main.gamestore.services.user.ExtendedUser;

@Component
public class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private TokenProvider tokenProvider;

	public RestAuthenticationSuccessHandler() {
		this.tokenProvider = new TokenProvider();
	}
	
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        		
        String generatedToken = generateJWTToken(response, authentication);
    	
    	UserViewModel userToSend = new UserViewModel();
    	
    	ExtendedUser springSecurityUser = null;
        String userName = null;

        if(authentication != null) {
        	
            if (authentication.getPrincipal() instanceof UserDetails) {
            	
                springSecurityUser = (ExtendedUser) authentication.getPrincipal();

                userToSend.setId(springSecurityUser.getId());
                userToSend.setUsername(springSecurityUser.getUsername());
                userToSend.setToken(generatedToken);
                
            } else if (authentication.getPrincipal() instanceof String) {
                userName = (String) authentication.getPrincipal();
            }
        }
        
    	SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, userToSend);
    }
    
    private String generateJWTToken(HttpServletResponse response, Authentication authentication) {
        
        String jwt = tokenProvider.createToken(authentication, false);
        response.addHeader(JWTConfigurer.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new JWTToken(jwt).getAuthToken();
    }

}
