package com.main.gamestore.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.main.gamestore.filters.JSONUsernamePasswordAuthenticationFilter;
import com.main.gamestore.security.CustomLogoutHandler;
import com.main.gamestore.security.RestAccessDeniedHandler;
import com.main.gamestore.security.RestAuthenticationFailureHandler;
import com.main.gamestore.security.RestAuthenticationSuccessHandler;
import com.main.gamestore.security.RestUnauthorizedEntryPoint;
import com.main.gamestore.services.user.UserSecurityService;

@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableTransactionManagement
@EnableJpaRepositories
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserSecurityService userService;
	
	@Autowired
	private CustomLogoutHandler customLogoutHandler;
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
            return super.authenticationManagerBean();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.userDetailsService(this.userService).passwordEncoder(passwordEncoder());
	}
	    
	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		
//		CharacterEncodingFilter filter = new CharacterEncodingFilter();
//		filter.setEncoding("UTF-8");
//		filter.setForceEncoding(true);
		
		http
			.authorizeRequests()
				.antMatchers("/resources/**", "/api/isAuthenticated").permitAll()
				.anyRequest().authenticated()
				.and()
				.addFilterAt(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling()
                .authenticationEntryPoint(getRestUnauthorizedEntryPoint())
                .accessDeniedHandler(getRestAccessDeniedHandler())
                .and()
//				.formLogin().loginProcessingUrl("/api/login").permitAll()
//          .formLogin()
//              .loginProcessingUrl("/api/login")
//            	.loginPage("/api/login")
//              .usernameParameter("username")
//              .passwordParameter("password")
//            	.permitAll()
//              .and()
			.logout()
//				.logoutUrl("/logout")
				.logoutUrl("/api/logout")
//				.logoutSuccessUrl("/login")
				.logoutSuccessHandler(customLogoutHandler)
				.invalidateHttpSession(true)
				.and()
			.csrf()
				.disable();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(14);
	}

	@Bean
	public RestAuthenticationSuccessHandler getRestAuthenticationSuccessHandler() {
		return new RestAuthenticationSuccessHandler();
	}
	
	@Bean
	public RestAuthenticationFailureHandler getRestAuthenticationFailureHandler() {
		return new RestAuthenticationFailureHandler();
	}
	
	@Bean
	public RestUnauthorizedEntryPoint getRestUnauthorizedEntryPoint() {
		return new RestUnauthorizedEntryPoint();
	}
	
	@Bean
	public RestAccessDeniedHandler getRestAccessDeniedHandler() {
		return new RestAccessDeniedHandler();
	}
	
	@Bean
	public CustomLogoutHandler getCustomLogoutHandler() {
		return new CustomLogoutHandler();
	}
	
	private JSONUsernamePasswordAuthenticationFilter customAuthenticationFilter() throws Exception {
		JSONUsernamePasswordAuthenticationFilter filter = new JSONUsernamePasswordAuthenticationFilter();
		filter.setAuthenticationSuccessHandler(getRestAuthenticationSuccessHandler());
        filter.setAuthenticationFailureHandler(getRestAuthenticationFailureHandler());
        filter.setAuthenticationManager(authenticationManager());
        filter.setFilterProcessesUrl("/api/login");
        
        return filter;
    }
	
}
