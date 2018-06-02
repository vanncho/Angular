package com.ticketstore.server.services;

import com.ticketstore.server.entities.Role;
import com.ticketstore.server.repositories.RoleRepository;
import com.ticketstore.server.services.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    private static final long ADMIN_ROLE_ID = 1L;
    private static final long USER_ROLE_ID = 2L;
    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void initialCreateRoles() {

        Role admin = new Role(ADMIN_ROLE_ID, "ROLE_ADMIN");
        Role user = new Role(USER_ROLE_ID, "ROLE_USER");

        roleRepository.save(admin);
        roleRepository.save(user);
    }

    @Override
    public Role findRole(Long roleId) {

        Optional<Role> role = roleRepository.findById(roleId);

        return role.orElse(null);
    }
}
