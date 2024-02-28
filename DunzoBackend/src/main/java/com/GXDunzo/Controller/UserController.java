package com.GXDunzo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GXDunzo.Entities.AuthRequest;
import com.GXDunzo.Entities.Users;
import com.GXDunzo.Exception.UserAlreadyExists;
import com.GXDunzo.Exception.UserNotFound;
import com.GXDunzo.Service.JwtService;
import com.GXDunzo.Service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException; 

@RestController
@RequestMapping("/Dunzo")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	UserService userservice;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	JwtService jwtservice;

	@PostMapping("/POST")
	public Users registerUser(@RequestBody Users users) throws UserAlreadyExists, Exception {
		try {
			return userservice.registerUser(users);
		} catch (UserAlreadyExists e) {
			throw new UserAlreadyExists(e.getMessage());
		} catch (Exception e) {
			throw new Exception();
		}
	}
	
	
	
	@GetMapping("/GET/{userEmail}/{userPassword}")
	public ResponseEntity<?> findByUserEmailAndUserPassword(@PathVariable String userEmail, @PathVariable String userPassword)
			throws UserNotFound, Exception {
		try {
			return new ResponseEntity<>(userservice.findByUserEmailAndUserPassword(userEmail, userPassword),HttpStatus.OK);
			} catch (UserNotFound e) {
				return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
			}

	}
	
	
	@PostMapping("/Login")
	public ResponseEntity<?> findByUserEmailAndUserPassword1(@RequestBody AuthRequest auth)
			throws UserNotFound, Exception {
			
		try {
			Users user = userservice.findByUserEmailAndUserPassword(auth.getUserEmail(),auth.getUserPassword());
			Authentication authenticate = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(auth.getUserEmail(), auth.getUserPassword()));
			if(authenticate.isAuthenticated()) {
				String token = jwtservice.generateToken(auth.getUserEmail());
				return new ResponseEntity<>(token,HttpStatus.OK); 
			}
		} catch (Exception e) {
				throw new UserNotFound(e.getMessage());
		} 
		throw new UsernameNotFoundException("User not found");
	}
	
	
	@PutMapping("/updateUser/{userEmail}")
	public ResponseEntity<?>  updateUser(@PathVariable String userEmail, @RequestBody Users users){
		try {
			return new ResponseEntity<>(userservice.updateUser(userEmail, users),HttpStatus.OK);
			} catch (UserNotFound e) {
				return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
			}
	}
	
	
	
}
