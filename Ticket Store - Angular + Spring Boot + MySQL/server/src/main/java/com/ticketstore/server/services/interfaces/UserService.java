package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.models.Role.binding.RoleModel;
import com.ticketstore.server.models.User.binding.UserRegisterModel;
import com.ticketstore.server.models.User.binding.UserUpdateModel;
import com.ticketstore.server.models.User.view.UserViewModel;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    UserViewModel register(UserRegisterModel userRegisterModel);

    UserViewModel getUserByUsername(String username);

    List<UserViewModel> getAllUsers();

    List<UserViewModel> getAllUsersWith(RoleModel userRole);

    UserViewModel getUserById(Long userId);

    boolean updateUser(UserUpdateModel userModel);

    void disableOrEnableUser(Long userId);

    List<UserViewModel> searchUsersByName(String username);
}
