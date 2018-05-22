package com.gamestore.configurations;

import com.gamestore.configurations.jwt.JWTConfigurer;
import com.gamestore.configurations.jwt.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    //private final UserService userService;
    private final TokenProvider tokenProvider;

    @Autowired
    public SecurityConfiguration(TokenProvider tokenProvider) {

        //this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//
//        auth.userDetailsService(userService).passwordEncoder(getBCryptPasswordEncoder());
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .exceptionHandling().accessDeniedPage("/no-access")
                .and()
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/register").permitAll()
                .antMatchers("/api/login").permitAll()
                .antMatchers("/api/allGames").permitAll()
                .antMatchers("/api/details/{id}").permitAll()
//                .antMatchers("/api/chat/invitation").permitAll()
//                .antMatchers("/api/users/people").permitAll()
                .antMatchers("/api/logout").permitAll()
//                .antMatchers("/api/notification").permitAll()
//                .antMatchers("/api/chat/getChat/{chatId}").permitAll()
                .antMatchers("/**").permitAll()
                .and().apply(securityConfigurerAdapter());
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }

    @Bean
    public BCryptPasswordEncoder getBCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }
}
