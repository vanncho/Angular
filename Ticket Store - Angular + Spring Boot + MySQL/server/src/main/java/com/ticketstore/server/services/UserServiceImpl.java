package com.ticketstore.server.services;

import com.ticketstore.server.entities.Role;
import com.ticketstore.server.entities.User;
import com.ticketstore.server.exceptions.UserNotFoundException;
import com.ticketstore.server.models.User.binding.UserRegisterModel;
import com.ticketstore.server.models.User.view.UserViewModel;
import com.ticketstore.server.repositories.UserRepository;
import com.ticketstore.server.services.interfaces.RoleService;
import com.ticketstore.server.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private static final long ADMIN_ROLE_ID = 1L;
    private static final long USER_ROLE_ID = 2L;
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleService roleService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findOneByUsername(username);

        if (user == null) {

            throw new UsernameNotFoundException("User not found!"); // TODO: export to constants!
        }

        return user;
    }

    @Override
    public UserViewModel register(UserRegisterModel userRegisterModel) {

        User user = new User();
        String hashedPassword = bCryptPasswordEncoder.encode(userRegisterModel.getPassword());

        // TODO: model mapper !
        // // //
        user.setUsername(userRegisterModel.getEmail()); // reversed for binding problem in spring !
        user.setEmail(userRegisterModel.getUsername()); // reversed for binding problem in spring !
        // // //

        user.setFirstName(userRegisterModel.getFirstName());
        user.setLastName(userRegisterModel.getLastName());
        user.setPassword(hashedPassword);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);

        int totalUsersInDB = userRepository.getUsersCount();
        Role role = null;

        if (totalUsersInDB == 0) {

            roleService.initialCreateRoles();
            role = roleService.findRole(ADMIN_ROLE_ID);

        } else {

            role = roleService.findRole(USER_ROLE_ID);
        }

        user.getAuthorities().add(role);

        User savedUser = userRepository.save(user);
        UserViewModel userViewModel = new UserViewModel();
        userViewModel.setId(savedUser.getId());
        userViewModel.setEmail(savedUser.getEmail());
        userViewModel.setUsername(savedUser.getUsername());

        return userViewModel;
    }

    @Override
    public UserViewModel getUserByUsername(String username) {

        User user = this.userRepository.findOneByUsername(username);

        if (user == null) {
            throw new UserNotFoundException();
        }

        UserViewModel userViewModel = new UserViewModel();
        userViewModel.setId(user.getId());
        userViewModel.setEmail(user.getEmail());
        userViewModel.setUsername(user.getUsername());
        userViewModel.setFullName(user.getFirstName() + " " + user.getLastName());

        String userRole = setRoleToUserView(user.getAuthorities());

        userViewModel.setRole(userRole);

        //return this.modelMapper.map(user, UserViewModel.class);

        return userViewModel;
    }

    private String setRoleToUserView(Set<Role> roles) {

        String userRole = "user";

        for (Role role : roles) {

            if (role.getAuthority().equals("ROLE_ADMIN")) {
                userRole = "admin";
            }
        }

        return userRole;
    }
}
