package com.ticketstore.server.controllers;

import com.ticketstore.server.models.Role.view.RoleViewModel;
import com.ticketstore.server.services.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class RoleController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/allRoles")
    public ResponseEntity<List<RoleViewModel>> getAllUsers() {

        List<RoleViewModel> roles = roleService.getAllRoles();

        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
}
