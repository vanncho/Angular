package com.gamestore.services.interfaces;

import com.gamestore.entities.Role;

public interface RoleService {

    void initialCreateRoles();

    Role findRole(Long roleId);
}
