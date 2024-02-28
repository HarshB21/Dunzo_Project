package com.GXDunzo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.GXDunzo.Entities.Users;
import com.GXDunzo.Repository.UserRepository;

@Component
public class UserInfoService implements UserDetailsService{
	
	 	@Autowired
	    private UserRepository repository; 
	  
	    @Autowired
	    private PasswordEncoder encoder; 
	  
	    @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
	  
	       Optional<Users>  user = Optional.of(repository.findByUserEmail(username)); 
	  
	       
	        return user.map(UserInfoDetails::new) 
	                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username)); 
	    } 
	  
	    public String addUser(Users user) { 
	        user.setUserPassword(encoder.encode(user.getUserPassword())); 
	        repository.save(user); 
	        return "User Added Successfully"; 
	    } 
	  
}
