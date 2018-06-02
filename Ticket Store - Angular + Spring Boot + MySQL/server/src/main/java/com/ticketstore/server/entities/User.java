package com.ticketstore.server.entities;

import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username", unique = true)
	private String username;
	
	private String password;
	
	private String email;

	@Column(name = "firstName")
	private String firstName;

	@Column(name = "lastName")
	private String lastName;

	private boolean accountNonExpired;

	private boolean accountNonLocked;

	private boolean credentialsNonExpired;
	
	private boolean enabled;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> authorities;

//	@ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "users_games",
//    joinColumns = @JoinColumn(name = "userId", referencedColumnName = "id"),
//    inverseJoinColumns = @JoinColumn(name = "gameId", referencedColumnName = "id"))
//	private Set<Game> games;
	
	public User() {
		this.authorities = new HashSet<>();
//		this.games = new HashSet<>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return accountNonExpired;
	}

	public void setAccountNonExpired(boolean accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return accountNonLocked;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return credentialsNonExpired;
	}

	public void setCredentialsNonExpired(boolean credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public Set<Role> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<Role> authorities) {
		this.authorities = authorities;
	}

//	public Set<Game> getGames() {
//		return games;
//	}
//
//	public void setGames(Set<Game> games) {
//		this.games = games;
//	}
}
