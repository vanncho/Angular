package com.main.gamestore.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

public class JWTFilter extends GenericFilterBean {

    //private final Logger log = LoggerFactory.getLogger(TokenProvider.class);
    private TokenProvider tokenProvider;

	public JWTFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    	System.err.println("JWTFilter - do filter");
        try {
            HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
            String jwt = resolveToken(httpServletRequest);
            
            if (StringUtils.hasText(jwt) && this.tokenProvider.validateToken(jwt)) {
            	
                Authentication authentication = this.tokenProvider.getAuthentication(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            
            filterChain.doFilter(servletRequest, servletResponse);
            
        } catch (ExpiredJwtException eje) {
//            log.info("Security exception for user {} - {}",
//                    eje.getClaims().getSubject(), eje.getMessage());

//            log.trace("Security exception trace: {}", eje);
            ((HttpServletResponse) servletResponse).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private String resolveToken(HttpServletRequest request){
    	
        String bearerToken = request.getHeader(JWTConfigurer.AUTHORIZATION_HEADER);
        
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
        	
            return bearerToken.substring(7, bearerToken.length());
        }
        
        return null;
    }
}
