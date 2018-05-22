package com.gamestore.configurations.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JWTToken {

    private String authToken;

    JWTToken(String authToken) {
        this.authToken = authToken;
    }

    @JsonProperty("auth_token")
    String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
