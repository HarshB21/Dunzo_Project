package com.GXDunzo.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.GXDunzo.Entities.Users;

public class UserInfoDetails implements UserDetails{
	
	private String userEmail; 
    private String userPassword; 
    private List<GrantedAuthority> authorities; 
  
    public UserInfoDetails(Users user) { 
    	userEmail = user.getUserEmail(); 
    	userPassword = user.getUserPassword(); 
        authorities = Arrays.stream(user.getUserRole().split(",")) 
                .map(SimpleGrantedAuthority::new) 
                .collect(Collectors.toList()); 
    } 
  
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { 
        return authorities; 
    } 
  
    @Override
    public String getPassword() { 
        return userPassword; 
    } 
  
    @Override
    public String getUsername() { 
        return userEmail; 
    } 
  
    @Override
    public boolean isAccountNonExpired() { 
        return true; 
    } 
  
    @Override
    public boolean isAccountNonLocked() { 
        return true; 
    } 
  
    @Override
    public boolean isCredentialsNonExpired() { 
        return true; 
    } 
  
    @Override
    public boolean isEnabled() { 
        return true; 
    } 
}
