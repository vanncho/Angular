package com.main.gamestore.security.jwt;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

//@Component
public class TokenProvider {

	//private final Logger log = LoggerFactory.getLogger(TokenProvider.class);

    private String AUTHORITIES_KEY = "auth";

    private String secretKey = "social-room-ck";

    private long tokenValidityInMilliseconds = 50_100_100;

    private long tokenValidityInMillisecondsForRememberMe = 100_100_100;

    public String createToken(Authentication authentication, Boolean rememberMe) {
    	System.err.println("createToken");
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        
        Date validity;
        
        if (rememberMe) {
        	
            validity = new Date(now + this.tokenValidityInMillisecondsForRememberMe);
        } else {
        	
            validity = new Date(now + this.tokenValidityInMilliseconds);
        }

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String token) {
    	System.err.println("getAuthentication");
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String authToken) {
    	
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
//            log.info("Invalid JWT signature.");
//            log.trace("Invalid JWT signature trace: {}", e);
            System.err.println("Invalid JWT signature.");
            System.err.println("Invalid JWT signature trace: {}: " + e);
        } catch (MalformedJwtException e) {
            //log.info("Invalid JWT token.");
            //log.trace("Invalid JWT token trace: {}", e);
        	System.err.println("Invalid JWT token.");
        	System.err.println("Invalid JWT token trace: {}: " + e);
        } catch (ExpiredJwtException e) {
            //log.info("Expired JWT token.");
            //log.trace("Expired JWT token trace: {}", e);
        	System.err.println("Expired JWT token.");
        			System.err.println("Expired JWT token trace: {}: " + e);
        } catch (UnsupportedJwtException e) {
            //log.info("Unsupported JWT token.");
            //log.trace("Unsupported JWT token trace: {}", e);
        	System.err.println("Unsupported JWT token.");
        	System.err.println("Unsupported JWT token trace: {}: " + e);
        } catch (IllegalArgumentException e) {
            //log.info("JWT token compact of handler are invalid.");
            //log.trace("JWT token compact of handler are invalid trace: {}", e);
        	System.err.println("JWT token compact of handler are invalid.");
        	System.err.println("JWT token compact of handler are invalid trace: {}: " + e);
        }
        
        return false;
    }
}
