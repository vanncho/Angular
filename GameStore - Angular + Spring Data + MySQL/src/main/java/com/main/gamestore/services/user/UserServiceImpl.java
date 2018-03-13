package com.main.gamestore.services.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.main.gamestore.enumerations.UserRole;
import com.main.gamestore.models.User;
import com.main.gamestore.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	
	private BCryptPasswordEncoder encoder;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder encoder) {
		this.userRepository = userRepository;
		this.encoder = encoder;
	}
	
	@Override
	public User register(User user) {
		
		user.setEnabled(true);
		user.setRole(UserRole.USER);
		user.setPassword(encoder.encode(user.getPassword()));
		
		User newllyRegisteredUser = userRepository.save(user);
		
		User sendToFrontend = new User();
		sendToFrontend.setFullName(newllyRegisteredUser.getFullName());
		sendToFrontend.setId(newllyRegisteredUser.getId());
		sendToFrontend.setUsername(newllyRegisteredUser.getUsername());
		
		return sendToFrontend;
	}
	
}
