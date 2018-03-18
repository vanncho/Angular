package com.main.gamestore.models.view;

public class UserViewModel {

	private long id;
    private String username;
    private String token;

    public UserViewModel() {
    }

    public UserViewModel(long id, String username, String token) {
        this.id = id;
        this.username = username;
        this.token = token;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
