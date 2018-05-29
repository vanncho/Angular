package com.gamestore.services;

import com.gamestore.entities.Cart;
import com.gamestore.entities.Role;
import com.gamestore.entities.User;
import com.gamestore.exceptions.UserNotFoundException;
import com.gamestore.models.User.binding.UserRegisterModel;
import com.gamestore.models.User.view.UserViewModel;
import com.gamestore.repositories.CartRepository;
import com.gamestore.repositories.RoleRepository;
import com.gamestore.repositories.UserRepository;
import com.gamestore.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CartRepository cartRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, CartRepository cartRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.cartRepository = cartRepository;
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
        user.setUsername(userRegisterModel.getUsername());
        user.setEmail(userRegisterModel.getEmail());
        user.setFullName(userRegisterModel.getFullName());
        user.setPassword(hashedPassword);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);

        Role role = this.roleRepository.findOne(2L); // TODO: export to constants !
        user.getAuthorities().add(role);

        User savedUser = userRepository.save(user);
        UserViewModel userViewModel = new UserViewModel();
        userViewModel.setId(savedUser.getId());
        userViewModel.setEmail(savedUser.getEmail());

        Cart userCart = new Cart();
        userCart.setUser(savedUser);

        cartRepository.save(userCart);

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
