package com.ticketstore.server.enumerations;

public enum UserRole {

    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String role() {
        return this.role;
    }
}
