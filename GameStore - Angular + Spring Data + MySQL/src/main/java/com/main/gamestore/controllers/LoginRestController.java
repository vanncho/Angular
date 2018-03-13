//package com.main.gamestore.controllers;
//
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.main.gamestore.models.User;
//
//@RestController
//@RequestMapping("/api")
//public class LoginRestController {
//
//	@PostMapping("/login")
//	public void doLogin() {
////		
//		System.err.println("LOGIN CONTROLLER");
//		User loggedUser = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		System.err.println(loggedUser.getPassword());
//	}
//}
