package com.main.gamestore.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.gamestore.security.SecurityUtils;

@RestController
@RequestMapping("/api")
public class AuthenticateController {
	
	@GetMapping("/isAuthenticated")
	public boolean home() {

		String logged = SecurityUtils.getCurrentLogin();
		
		System.err.println(logged);
		
		if (!logged.equals("anonymousUser")) {
			
//			User user = (User) authentication.getPrincipal();
			System.err.println("TRUE");
			return true;
		}
		
		System.err.println("FALSE");
		return false;
	}
	
}
