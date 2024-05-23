package com.example.demo.models;

public enum Role {
    ADMIN("admin"),
    USER("user");

    private String role;

    Role(String role) {
        this.role = role;
    }

    public String getValue() {
        return role;
    }
}
