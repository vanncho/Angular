package com.ticketstore.server.configurations.jwt;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class TokenProvider {

    private final Logger log = LoggerFactory.getLogger(TokenProvider.class);
    private static final String AUTHORITIES_KEY = "auth";
    private String secretKey = "RockAmRing";

    String createToken(Authentication authentication, Boolean rememberMe) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date validity;

        if (rememberMe) {

            long tokenValidityInMillisecondsForRememberMe = 100_100_100L;
            validity = new Date(now + tokenValidityInMillisecondsForRememberMe);

        } else {

            long tokenValidityInMilliseconds = 50_100_100L;
            validity = new Date(now + tokenValidityInMilliseconds);
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(signatureAlgorithm, signingKey)
                .setExpiration(validity)
                .compact();
    }

    Authentication getAuthentication(String token) {

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

    boolean validateToken(String authToken) {

        try {

            Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                    .parseClaimsJws(authToken)
                    .getBody();

            return true;

        } catch (SignatureException e) {

            log.info("Invalid JWT signature.");
            log.trace("Invalid JWT signature trace: {}", e);

            return false;

        } catch (MalformedJwtException e) {

            log.info("Invalid JWT token.");
            log.trace("Invalid JWT token trace: {}", e);

            return false;

        } catch (ExpiredJwtException e) {

            log.info("Expired JWT token.");
            log.trace("Expired JWT token trace: {}", e);

            return false;

        } catch (UnsupportedJwtException e) {

            log.info("Unsupported JWT token.");
            log.trace("Unsupported JWT token trace: {}", e);

            return false;

        } catch (IllegalArgumentException e) {

            log.info("JWT token compact of handler are invalid.");
            log.trace("JWT token compact of handler are invalid trace: {}", e);

            return false;
        }

    }
}
