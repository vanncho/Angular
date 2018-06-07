package com.ticketstore.server.services.interfaces;

import com.ticketstore.server.entities.Role;
import com.ticketstore.server.models.Role.view.RoleViewModel;

import java.util.List;

public interface RoleService {

    void initialCreateRoles();

    Role findRole(Long roleId);

    Role findRoleByName(String name);

    List<RoleViewModel> getAllRoles();
}
