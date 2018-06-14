package com.ticketstore.server.services;

import com.ticketstore.server.entities.Role;
import com.ticketstore.server.entities.User;
import com.ticketstore.server.enumerations.UserRole;
import com.ticketstore.server.exceptions.UserNotFoundException;
import com.ticketstore.server.models.Role.binding.RoleModel;
import com.ticketstore.server.models.User.binding.UserRegisterModel;
import com.ticketstore.server.models.User.binding.UserUpdateModel;
import com.ticketstore.server.models.User.view.UserViewModel;
import com.ticketstore.server.repositories.UserRepository;
import com.ticketstore.server.services.interfaces.RoleService;
import com.ticketstore.server.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

        UserViewModel userViewModel = convertUserEntityToModel(user);

        return userViewModel;
    }

    @Override
    public List<UserViewModel> getAllUsers() {

        List<User> users = userRepository.getAllOrderByUsername();
        List<UserViewModel> usersToView = new ArrayList<>(users.size());

        for (User user : users) {

            UserViewModel userView = convertUserEntityToModel(user);

            usersToView.add(userView);
        }

        return usersToView;
    }

    @Override
    public List<UserViewModel> getAllUsersWith(RoleModel userRole) {

        String role = UserRole.USER.role();

        if (userRole.getRole().equals("admin")) {
            role = UserRole.ADMIN.role();
        }

        List<User> users = userRepository.getAllUsersWithGivenRole(role);
        List<UserViewModel> usersToView = new ArrayList<>(users.size());

        for (User user : users) {

            UserViewModel userView = convertUserEntityToModel(user);

            usersToView.add(userView);
        }

        return usersToView;
    }

    @Override
    public UserViewModel getUserById(Long userId) {

        Optional<User> userOptional = userRepository.findById(userId);
        UserViewModel userView = null;

        if (userOptional.isPresent()) {

            User user = userOptional.get();

            userView = convertUserEntityToModel(user);
        }

        return userView;
    }

    @Override
    public boolean updateUser(UserUpdateModel userModel) {

        User userFromDb = userRepository.getOne(userModel.getId());

        if (userFromDb != null) {

            userFromDb.setUsername(userModel.getUsername());
            userFromDb.setFirstName(userModel.getFirstName());
            userFromDb.setLastName(userModel.getLastName());
            userFromDb.setEmail(userModel.getEmail());

            Role role = roleService.findRoleByName(userModel.getRole());
            userFromDb.getAuthorities().clear();
            userFromDb.getAuthorities().add(role);

            userRepository.save(userFromDb);

            return true;
        }

        return false;
    }

    @Override
    public void disableOrEnableUser(Long userId) {

        User user = userRepository.getOne(userId);

        user.setAccountNonLocked(!user.isAccountNonLocked());

        userRepository.save(user);
    }

    @Override
    public List<UserViewModel> searchUsersByName(String username) {

        List<User> users = userRepository.getAllByUsernameIsStartingWithOrderByUsername(username);
        List<UserViewModel> usersToView = new ArrayList<>(users.size());

        for (User user : users) {

            UserViewModel userView = convertUserEntityToModel(user);

            usersToView.add(userView);
        }

        return usersToView;
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

    private UserViewModel convertUserEntityToModel(User user) {

        UserViewModel singleUserView = new UserViewModel();

        singleUserView.setId(user.getId());
        singleUserView.setUsername(user.getUsername());
        singleUserView.setFirstName(user.getFirstName());
        singleUserView.setLastName(user.getLastName());
        singleUserView.setFullName();
        singleUserView.setEmail(user.getEmail());

        String userRole = setRoleToUserView(user.getAuthorities());
        singleUserView.setRole(userRole);
        singleUserView.setAccountLocked(!user.isAccountNonLocked());

        return singleUserView;
    }
}
