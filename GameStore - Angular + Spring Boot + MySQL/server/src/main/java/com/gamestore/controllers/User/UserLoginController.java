package com.gamestore.controllers.User;

import com.gamestore.configurations.jwt.JWTGenerator;
import com.gamestore.models.User.binding.LoginModel;
import com.gamestore.models.User.view.UserViewModel;
import com.gamestore.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collections;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class UserLoginController {

    private final UserService userService;
    private final JWTGenerator tokenGenerator;

    @Autowired
    public UserLoginController(UserService userService, JWTGenerator tokenGenerator) {
        this.userService = userService;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity authorize(@Valid @RequestBody LoginModel loginModel, HttpServletResponse response) {

        System.out.println("LOGIN CONTROLLER");
        UserViewModel user = userService.getUserByUsername(loginModel.getUsername());

        try {
            String jwtToken = tokenGenerator.generateJWTToken(loginModel.getUsername(), loginModel.getPassword(), response, loginModel.isRememberMe());
            user.setToken(jwtToken);
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (AuthenticationException ae) {
            return new ResponseEntity<>(Collections.singletonMap("AuthenticationException", ae.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
