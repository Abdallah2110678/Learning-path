package com.example.demo.models;

public enum Status {
    APPROVED("approve"),
    REJECTED("rejected"),
    PENDING("pending");


    private String status;

    Status(String status) {
        this.status = status;
    }

    public String getValue() {
        return status;
    }
}
