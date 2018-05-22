package com.gamestore.services.interfaces;

import com.gamestore.models.User.binding.UserRegisterModel;
import com.gamestore.models.User.view.UserViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    UserViewModel register(UserRegisterModel userRegisterModel);

    UserViewModel getUserByUsername(String username);
}
