package com.gamestore.controllers.User;

import com.gamestore.configurations.jwt.JWTGenerator;
import com.gamestore.models.User.binding.UserRegisterModel;
import com.gamestore.models.User.view.UserViewModel;
import com.gamestore.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class UserRegisterController {

    private final UserService userService;
    private final JWTGenerator tokenGenerator;

    @Autowired
    public UserRegisterController(UserService userService, JWTGenerator tokenGenerator) {
        this.userService = userService;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody UserRegisterModel userRegisterModel, HttpServletResponse response){

        UserViewModel registeredUser = this.userService.register(userRegisterModel);

        System.err.println("UserRegisterController");

        try {
            String jwtToken = tokenGenerator.generateJWTToken(userRegisterModel.getUsername(), userRegisterModel.getPassword(), response, null);
            registeredUser.setToken(jwtToken);
            return new ResponseEntity<>(registeredUser, HttpStatus.OK);

        } catch (AuthenticationException ae) {
            return new ResponseEntity<>(Collections.singletonMap("AuthenticationException", ae.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

}
