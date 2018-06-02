package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.entities.Role;

public interface RoleService {

    void initialCreateRoles();

    Role findRole(Long roleId);
}
