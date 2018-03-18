package com.main.gamestore.services.user;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.main.gamestore.models.User;
import com.main.gamestore.repositories.UserRepository;

@Service
public class UserSecurityServiceImpl implements UserSecurityService {

	@Autowired
	private UserRepository userRepository;
	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findOneByUsername(username);

		if (user != null) {
			
			List<SimpleGrantedAuthority> authList = new ArrayList<SimpleGrantedAuthority>();
			authList.add(new SimpleGrantedAuthority("ROLE_USER"));

//			org.springframework.security.core.userdetails.User builtForAuthentication = new org.springframework.security.core.userdetails.User(
//					user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true, authList);
			return new ExtendedUser(user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true, authList, user.getId());
			
//			return builtForAuthentication;
		} else {
			// logger.error("User not found.");
			throw new UsernameNotFoundException("User not found.");
		}

	}

}
