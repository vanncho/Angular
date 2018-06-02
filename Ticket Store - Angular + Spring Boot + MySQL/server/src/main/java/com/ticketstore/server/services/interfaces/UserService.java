package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.User.binding.UserRegisterModel;
import com.ticketstore.server.models.User.view.UserViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    UserViewModel register(UserRegisterModel userRegisterModel);

    UserViewModel getUserByUsername(String username);
}
