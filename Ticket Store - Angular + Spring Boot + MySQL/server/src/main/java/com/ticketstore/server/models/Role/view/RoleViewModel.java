package com.ticketstore.server.models.Role.view;

public class RoleViewModel {

    private String role;

    public RoleViewModel() {

    }

    public RoleViewModel(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
