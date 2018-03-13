package com.main.gamestore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.main.gamestore.models.User;
import com.main.gamestore.services.user.UserService;

@RestController
@RequestMapping("/api")
public class RegisterRestController {

	private UserService userService;
	
	@Autowired
	public RegisterRestController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/register")
	public String doRegister(@RequestBody User user) {
		
		if (user != null) {
			
			User registredUser = userService.register(user);
			
			Gson gson = new Gson();
			String userAsJSONString = gson.toJson(registredUser);
			
			return userAsJSONString;
			
		} else {
			return "";
		}
	}
}
