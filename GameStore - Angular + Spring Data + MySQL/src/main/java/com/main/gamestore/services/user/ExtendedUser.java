package com.main.gamestore.services.user;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

@SuppressWarnings("serial")
public class ExtendedUser extends org.springframework.security.core.userdetails.User {

	private Long id;
	
	public ExtendedUser(String username, 
						String password, 
						boolean enabled, 
						boolean accountNonExpired,
						boolean credentialsNonExpired, 
						boolean accountNonLocked,
						Collection<? extends GrantedAuthority> authorities, Long id) {
		
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
		this.id = id;
	}

	public Long getId() {
		return id;
	}

}
